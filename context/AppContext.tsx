
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Player, Page, Toast, ToastType, Attempt, PlayerStats, Achievement } from '../types';
import { fetchLeaderboard, syncPlayerRecord } from '../services/supabaseService';
import { checkNewAchievements } from '../data/achievements';

interface AppContextType {
  player: Player | null;
  setPlayer: (player: Player) => void;
  leaderboard: Player[];
  isLoadingLeaderboard: boolean;
  updateScore: (gameScore: number) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
  addAttempt: (attempt: Attempt) => void;
  getPlayerStats: () => PlayerStats;
  unlockAchievement: (achievementId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialLeaderboard: Player[] = [];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayerState] = useState<Player | null>(() => {
      try {
          const item = window.localStorage.getItem('player');
          return item ? JSON.parse(item) : null;
      } catch (error) {
          console.error("Failed to parse player from localStorage", error);
          return null;
      }
  });
  const [leaderboard, setLeaderboard] = useState<Player[]>(() => {
    try {
        const item = window.localStorage.getItem('leaderboard');
        return item ? JSON.parse(item) : initialLeaderboard;
    } catch (error) {
        console.error("Failed to parse leaderboard from localStorage", error);
        return initialLeaderboard;
    }
  });
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
        if(player) {
            window.localStorage.setItem('player', JSON.stringify(player));
        } else {
            window.localStorage.removeItem('player');
        }
    } catch (error) {
        console.error("Failed to save player to localStorage", error);
    }
  }, [player]);

  useEffect(() => {
    try {
        window.localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    } catch (error) {
        console.error("Failed to save leaderboard to localStorage", error);
    }
  }, [leaderboard]);

  useEffect(() => {
    let isMounted = true;
    const loadLeaderboard = async () => {
      setIsLoadingLeaderboard(true);
      const remoteLeaderboard = await fetchLeaderboard();
      if (!isMounted || !remoteLeaderboard) return;

      let hasStoredLeaderboard = false;
      try {
        const stored = window.localStorage.getItem('leaderboard');
        if (stored) {
          const parsed = JSON.parse(stored);
          hasStoredLeaderboard = Array.isArray(parsed) && parsed.length > 0;
        }
      } catch (error) {
        console.error('Failed to read stored leaderboard during Supabase sync', error);
      }

      if (remoteLeaderboard.length === 0 && hasStoredLeaderboard) {
        setIsLoadingLeaderboard(false);
        return;
      }

      setLeaderboard(remoteLeaderboard);
      setIsLoadingLeaderboard(false);
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistPlayerToRemote = useCallback(async (playerToSave: Player, progress?: Record<string, unknown>) => {
    await syncPlayerRecord(playerToSave, progress);
  }, []);


  const setPlayer = (newPlayer: Player) => {
    setPlayerState(newPlayer);
    setLeaderboard(prev => {
        const existingPlayer = prev.find(p => p.name.toLowerCase() === newPlayer.name.toLowerCase());
        if (!existingPlayer) {
            return [...prev, newPlayer].sort((a, b) => b.score - a.score);
        }
        return prev;
    });
    persistPlayerToRemote(newPlayer);
    };
  
  const updateScore = useCallback((gameScore: number) => {
    if (!player) return;

    let newTotalScore = 0;
    setLeaderboard(prev => {
        const updatedLeaderboard = prev.map(p => {
            if (p.name === player.name) {
                newTotalScore = p.score + gameScore;
                return { ...p, score: newTotalScore };
            }
            return p;
        });
        return updatedLeaderboard.sort((a, b) => b.score - a.score);
    });

    setPlayerState(prevPlayer => {
      if(!prevPlayer) return null;
      const updatedPlayer: Player = { ...prevPlayer, score: newTotalScore };
      persistPlayerToRemote(updatedPlayer, {
        lastGameScore: gameScore,
        updatedAt: new Date().toISOString(),
      });
      return updatedPlayer;
    });
  }, [player, persistPlayerToRemote]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    };

  const unlockAchievement = useCallback((achievementId: string) => {
    setPlayerState(prevPlayer => {
      if (!prevPlayer) return null;

      // Check if achievement is already unlocked
      if (prevPlayer.achievements?.some(a => a.id === achievementId)) {
        return prevPlayer;
      }

      // Find the achievement definition
      const achievementDef = checkNewAchievements(prevPlayer).find(a => a.id === achievementId);
      if (!achievementDef) return prevPlayer;

      const newAchievement: Achievement = {
        id: achievementDef.id,
        name: achievementDef.name,
        description: achievementDef.description,
        icon: achievementDef.icon,
        category: achievementDef.category,
        unlockedAt: new Date().toISOString(),
      };

      const updatedAchievements = [...(prevPlayer.achievements || []), newAchievement];
      const updatedPlayer = { ...prevPlayer, achievements: updatedAchievements };

      persistPlayerToRemote(updatedPlayer, {
        achievements: updatedAchievements,
        achievementUnlockedAt: new Date().toISOString(),
      });

      return updatedPlayer;
    });
  }, [persistPlayerToRemote]);

  const addAttempt = useCallback((attempt: Attempt) => {
    setPlayerState(prevPlayer => {
      if (!prevPlayer) return null;
      const updatedAttempts = [...(prevPlayer.attempts || []), attempt];
      const updatedPlayer = { ...prevPlayer, attempts: updatedAttempts };

      // Check for new achievements
      const newAchievements = checkNewAchievements(updatedPlayer);
      if (newAchievements.length > 0) {
        newAchievements.forEach(achievement => {
          addToast(`🎉 Achievement Unlocked: ${achievement.name}!`, 'success');

          // Unlock the achievement
          setTimeout(() => {
            unlockAchievement(achievement.id);
          }, 100);
        });
      }

      persistPlayerToRemote(updatedPlayer, {
        attempts: updatedAttempts,
        lastAttemptAt: new Date().toISOString(),
      });
      return updatedPlayer;
    });
  }, [persistPlayerToRemote, unlockAchievement, addToast]);

  const getPlayerStats = useCallback((): PlayerStats => {
    if (!player || !player.attempts || player.attempts.length === 0) {
      return {
        totalGamesPlayed: 0,
        averageScore: 0,
        bestScore: 0,
        totalPoints: player?.score || 0,
        gameBreakdown: [],
      };
    }

    const attempts = player.attempts;
    const totalGamesPlayed = attempts.length;
    const totalScoreFromAttempts = attempts.reduce((sum, a) => sum + a.score, 0);
    const averageScore = Math.round(totalScoreFromAttempts / totalGamesPlayed);
    const bestScore = Math.max(...attempts.map(a => a.score));

    const gameMap = new Map<string, { gameId: string; gameTitle: string; attempts: number; bestScore: number }>();

    attempts.forEach(attempt => {
      const existing = gameMap.get(attempt.gameId);
      if (existing) {
        existing.attempts += 1;
        existing.bestScore = Math.max(existing.bestScore, attempt.score);
      } else {
        gameMap.set(attempt.gameId, {
          gameId: attempt.gameId,
          gameTitle: attempt.gameTitle,
          attempts: 1,
          bestScore: attempt.score,
        });
      }
    });

    const gameBreakdown = Array.from(gameMap.values());

    return {
      totalGamesPlayed,
      averageScore,
      bestScore,
      totalPoints: player.score,
      gameBreakdown,
    };
  }, [player]);

  const value = { player, setPlayer, leaderboard, isLoadingLeaderboard,  updateScore, currentPage, setCurrentPage, toasts, addToast, removeToast, addAttempt, getPlayerStats, unlockAchievement };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    };

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
    };




















