import React, { useState } from 'react';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import { Game, SkillCategory } from '../types';

const getNextFriday = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
    nextFriday.setHours(9, 0, 0, 0); // Set to 9 AM for clarity
    return nextFriday;
};

const GamesPage: React.FC = () => {
    const [mode, setMode] = useState<'challenge' | 'practice'>('challenge');
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');

    // Determine which game to show based on the week number
    // This creates a stable rotation that changes each week
    const startDate = new Date('2024-01-05T00:00:00Z'); // A known past Friday
    const now = new Date();
    const weeksPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
    const gameIndex = weeksPassed % games.length;
    const currentGame = games[gameIndex];

    const nextFriday = getNextFriday();
    const nextChallengeDate = nextFriday.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Filter games by category
    const filteredGames = selectedCategory === 'all'
        ? games
        : games.filter(g => g.skillCategory === selectedCategory);

    // Get unique skill categories
    const skillCategories: SkillCategory[] = Array.from(new Set(games.map(g => g.skillCategory)));

    return (
        <div>
            {/* Mode Toggle */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setMode('challenge')}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                        mode === 'challenge'
                            ? 'bg-cyan-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-650'
                    }`}
                >
                    🏆 Weekly Challenge
                </button>
                <button
                    onClick={() => {
                        setMode('practice');
                        setSelectedGame(null);
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${
                        mode === 'practice'
                            ? 'bg-cyan-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-650'
                    }`}
                >
                    🎯 Practice Mode
                </button>
            </div>

            {/* Challenge Mode */}
            {mode === 'challenge' && (
                <div>
                    <div className="mb-6 border-b border-gray-700 pb-4">
                        <h2 className="text-3xl font-bold text-cyan-400">This Week's Challenge</h2>
                        <p className="text-gray-400 mt-1">A new sourcing game unlocks every Friday. Good luck!</p>
                    </div>
                    <div className="space-y-8">
                        <GameCard key={currentGame.id} game={currentGame} />
                    </div>
                    <div className="mt-8 text-center bg-gray-800 p-4 rounded-lg">
                        <p className="text-gray-300">The next challenge will be available on <span className="font-bold text-cyan-400">{nextChallengeDate}</span>.</p>
                    </div>
                </div>
            )}

            {/* Practice Mode */}
            {mode === 'practice' && (
                <div>
                    <div className="mb-6 border-b border-gray-700 pb-4">
                        <h2 className="text-3xl font-bold text-cyan-400">Practice Mode</h2>
                        <p className="text-gray-400 mt-1">Choose any game to practice your sourcing skills!</p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-400 mb-3">Filter by Skill Category:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                    selectedCategory === 'all'
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-650'
                                }`}
                            >
                                All ({games.length})
                            </button>
                            {skillCategories.map(category => {
                                const count = games.filter(g => g.skillCategory === category).length;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                            selectedCategory === category
                                                ? 'bg-cyan-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-650'
                                        }`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Game Selection or Game Card */}
                    {selectedGame ? (
                        <div>
                            <button
                                onClick={() => setSelectedGame(null)}
                                className="mb-4 text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                            >
                                ← Back to Game Selection
                            </button>
                            <GameCard key={selectedGame.id} game={selectedGame} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredGames.map(game => {
                                const difficultyConfig = {
                                    easy: { color: 'bg-green-600', text: 'Easy', icon: '⭐' },
                                    medium: { color: 'bg-yellow-600', text: 'Medium', icon: '⭐⭐' },
                                    hard: { color: 'bg-red-600', text: 'Hard', icon: '⭐⭐⭐' }
                                };
                                const difficulty = difficultyConfig[game.difficulty];

                                return (
                                    <button
                                        key={game.id}
                                        onClick={() => setSelectedGame(game)}
                                        className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 text-left transition-all hover:shadow-xl border-2 border-transparent hover:border-cyan-600"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-bold flex-1 text-white">{game.title}</h3>
                                            <span className={`${difficulty.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                                                {difficulty.icon}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="bg-gray-700 text-cyan-400 px-3 py-1 rounded-full font-semibold">
                                                {game.skillCategory}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GamesPage;