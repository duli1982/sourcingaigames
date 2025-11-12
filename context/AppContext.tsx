
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Player, Page, Toast, ToastType, Attempt, PlayerStats, Achievement } from '../types';
import { fetchLeaderboard, fetchPlayerById, fetchPlayerBySessionToken, createPlayer, updatePlayer } from '../services/supabaseService';
import { checkNewAchievements } from '../data/achievements';
import { getCookie, setCookie, generateSessionToken } from '../utils/cookieUtils';

interface AppContextType {
  player: Player | null;
  setPlayer: (player: Player) => Promise<void>;
  isLoadingPlayer: boolean;
  leaderboard: Player[];
  isLoadingLeaderboard: boolean;
  updateScore: (gameScore: number) => Promise<void>;
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
  const [player, setPlayerState] = useState<Player | null>(null);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(true);
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

  // Load player from Supabase on mount (Session Token Primary, ID fallback, localStorage cache)
  useEffect(() => {
    let isMounted = true;

    const loadPlayer = async () => {
      setIsLoadingPlayer(true);

      try {
        // 1. Try to get session token from cookie (most persistent) or localStorage
        let sessionToken = getCookie('sessionToken');
        if (!sessionToken) {
          sessionToken = window.localStorage.getItem('sessionToken');
        }

        if (sessionToken) {
          // 2. Fetch player from Supabase by session token (source of truth)
          const playerData = await fetchPlayerBySessionToken(sessionToken);

          if (isMounted && playerData) {
            setPlayerState(playerData);
            // Update both storages
            window.localStorage.setItem('sessionToken', sessionToken);
            window.localStorage.setItem('playerId', playerData.id!);
            window.localStorage.setItem('player', JSON.stringify(playerData));
            setCookie('sessionToken', sessionToken, 365); // 1 year expiry
            return; // Exit early on success
          } else if (isMounted && !playerData) {
            // Session token invalid, clear all session data
            window.localStorage.removeItem('sessionToken');
            window.localStorage.removeItem('playerId');
            window.localStorage.removeItem('player');
            setCookie('sessionToken', '', -1); // Delete cookie
          }
        }

        // 3. Fallback to playerId (legacy support)
        const storedPlayerId = window.localStorage.getItem('playerId');
        if (storedPlayerId) {
          const playerData = await fetchPlayerById(storedPlayerId);

          if (isMounted && playerData) {
            setPlayerState(playerData);
            // Update cache and save session token if it exists
            window.localStorage.setItem('player', JSON.stringify(playerData));
            if (playerData.sessionToken) {
              window.localStorage.setItem('sessionToken', playerData.sessionToken);
              setCookie('sessionToken', playerData.sessionToken, 365);
            }
            return; // Exit early on success
          } else if (isMounted && !playerData) {
            // Player not found in DB, clear localStorage
            window.localStorage.removeItem('playerId');
            window.localStorage.removeItem('player');
          }
        }

        // 4. Final fallback to localStorage cache only (for offline use)
        try {
          const cachedPlayer = window.localStorage.getItem('player');
          if (cachedPlayer && isMounted) {
            const parsedPlayer = JSON.parse(cachedPlayer);
            setPlayerState(parsedPlayer);
            console.warn('Loaded player from cache (offline mode)');
          }
        } catch (error) {
          console.error('Failed to parse cached player:', error);
        }
      } catch (error) {
        console.error('Error loading player:', error);
      } finally {
        if (isMounted) {
          setIsLoadingPlayer(false);
        }
      }
    };

    loadPlayer();

    return () => {
      isMounted = false;
    };
  }, []);

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

  // Async setPlayer: Creates player in Supabase first, with session token and optimistic updates
  const setPlayer = useCallback(async (newPlayer: Player) => {
    // Generate session token if not present
    const sessionToken = newPlayer.sessionToken || generateSessionToken();
    const playerWithToken = { ...newPlayer, sessionToken };

    // Optimistic update (update UI immediately)
    setPlayerState(playerWithToken);
    window.localStorage.setItem('player', JSON.stringify(playerWithToken));

    try {
      let savedPlayer: Player | null;

      if (playerWithToken.id) {
        // Update existing player in Supabase
        savedPlayer = await updatePlayer(playerWithToken);
      } else {
        // Create new player in Supabase with session token
        savedPlayer = await createPlayer(playerWithToken.name, sessionToken);
      }

      if (savedPlayer) {
        // Update with server response (includes DB-generated ID and session token)
        setPlayerState(savedPlayer);
        window.localStorage.setItem('playerId', savedPlayer.id!);
        window.localStorage.setItem('sessionToken', savedPlayer.sessionToken!);
        window.localStorage.setItem('player', JSON.stringify(savedPlayer));

        // Store session token in cookie for persistence across browser sessions
        setCookie('sessionToken', savedPlayer.sessionToken!, 365); // 1 year expiry

        // Update leaderboard
        setLeaderboard(prev => {
          const existingIndex = prev.findIndex(p => p.id === savedPlayer!.id || p.name.toLowerCase() === savedPlayer!.name.toLowerCase());
          if (existingIndex >= 0) {
            // Update existing player
            const updated = [...prev];
            updated[existingIndex] = savedPlayer!;
            return updated.sort((a, b) => b.score - a.score);
          } else {
            // Add new player
            return [...prev, savedPlayer!].sort((a, b) => b.score - a.score);
          }
        });
      } else {
        // Supabase save failed - keep optimistic update but warn
        addToast('Failed to save player data. Changes saved locally only.', 'error');
      }
    } catch (error) {
      console.error('Error saving player:', error);
      addToast('Network error. Changes saved locally only.', 'error');
    }
  }, []);
  
  // Async updateScore: Optimistic update with rollback on failure
  const updateScore = useCallback(async (gameScore: number) => {
    if (!player || !player.id) {
      addToast('Player not loaded. Please refresh the page.', 'error');
      return;
    }

    const oldScore = player.score;
    const newScore = oldScore + gameScore;

    // Optimistic update
    const optimisticPlayer = { ...player, score: newScore };
    setPlayerState(optimisticPlayer);
    window.localStorage.setItem('player', JSON.stringify(optimisticPlayer));

    // Optimistic leaderboard update
    setLeaderboard(prev =>
      prev.map(p => p.id === player.id ? optimisticPlayer : p)
        .sort((a, b) => b.score - a.score)
    );

    try {
      // Update Supabase (source of truth)
      const savedPlayer = await updatePlayer(optimisticPlayer);

      if (savedPlayer) {
        // Confirm with server data
        setPlayerState(savedPlayer);
        window.localStorage.setItem('player', JSON.stringify(savedPlayer));

        // Update leaderboard with confirmed data
        setLeaderboard(prev =>
          prev.map(p => p.id === savedPlayer.id ? savedPlayer : p)
            .sort((a, b) => b.score - a.score)
        );
      } else {
        // Rollback on failure
        const rolledBackPlayer = { ...player, score: oldScore };
        setPlayerState(rolledBackPlayer);
        window.localStorage.setItem('player', JSON.stringify(rolledBackPlayer));
        setLeaderboard(prev =>
          prev.map(p => p.id === player.id ? rolledBackPlayer : p)
            .sort((a, b) => b.score - a.score)
        );
        addToast('Failed to update score. Please try again.', 'error');
      }
    } catch (error) {
      // Rollback on error
      const rolledBackPlayer = { ...player, score: oldScore };
      setPlayerState(rolledBackPlayer);
      window.localStorage.setItem('player', JSON.stringify(rolledBackPlayer));
      setLeaderboard(prev =>
        prev.map(p => p.id === player.id ? rolledBackPlayer : p)
          .sort((a, b) => b.score - a.score)
      );
      console.error('Error updating score:', error);
      addToast('Network error. Score update failed.', 'error');
    }
  }, [player]);

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

      // Sync to Supabase (async, non-blocking)
      if (updatedPlayer.id) {
        updatePlayer(updatedPlayer).then(savedPlayer => {
          if (savedPlayer) {
            window.localStorage.setItem('player', JSON.stringify(savedPlayer));
          }
        }).catch(error => {
          console.error('Failed to sync achievement to Supabase:', error);
        });
      }

      // Update localStorage immediately
      window.localStorage.setItem('player', JSON.stringify(updatedPlayer));
      return updatedPlayer;
    });
  }, []);

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

      // Sync to Supabase (async, non-blocking)
      if (updatedPlayer.id) {
        updatePlayer(updatedPlayer).then(savedPlayer => {
          if (savedPlayer) {
            window.localStorage.setItem('player', JSON.stringify(savedPlayer));
          }
        }).catch(error => {
          console.error('Failed to sync attempt to Supabase:', error);
        });
      }

      // Update localStorage immediately
      window.localStorage.setItem('player', JSON.stringify(updatedPlayer));
      return updatedPlayer;
    });
  }, [unlockAchievement]);

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

  const value = { player, setPlayer, isLoadingPlayer, leaderboard, isLoadingLeaderboard, updateScore, currentPage, setCurrentPage, toasts, addToast, removeToast, addAttempt, getPlayerStats, unlockAchievement };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    };

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
    };




















