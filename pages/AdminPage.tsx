import React, { useEffect, useMemo, useState } from 'react';
import { games as baseGames } from '../data/games';
import { useUIContext } from '../context/UIContext';

type AdminAnalytics = {
  totalPlayers: number;
  active7d: number;
  active30d: number;
  attempts7d: number;
  attempts30d: number;
  repeatPlayers: number;
  churned14d: number;
  gameStats: { gameId: string; gameTitle: string; attempts: number; avgScore: number }[];
};

type AdminPlayer = {
  id: string;
  name: string;
  score: number;
  status: 'active' | 'banned';
  totalAttempts: number;
  lastAttemptAt?: string | null;
};

type AdminAttempt = {
  attemptId: string;
  playerId: string;
  playerName: string;
  gameId: string;
  gameTitle: string;
  submission: string;
  score: number;
  ts: string;
};

type GameOverride = {
  id: string;
  title?: string;
  description?: string;
  task?: string;
  prompt_template?: string;
  rubric_json?: any;
  featured?: boolean;
  active?: boolean;
};

const AdminPage: React.FC = () => {
  const { addToast } = useUIContext();
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [adminActor, setAdminActor] = useState(() => localStorage.getItem('admin_actor') || 'admin');
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [players, setPlayers] = useState<AdminPlayer[]>([]);
  const [attempts, setAttempts] = useState<AdminAttempt[]>([]);
  const [gameOverrides, setGameOverrides] = useState<GameOverride[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'attempts' | 'games'>('overview');

  const authHeaders = useMemo(
    () => ({ 'x-admin-token': adminToken, 'x-admin-actor': adminActor, 'Content-Type': 'application/json' }),
    [adminToken, adminActor]
  );

  const requireToken = (): boolean => {
    if (!adminToken) {
      addToast('Set admin token first.', 'error');
      return false;
    }
    localStorage.setItem('admin_token', adminToken);
    localStorage.setItem('admin_actor', adminActor || 'admin');
    return true;
  };

  const fetchAll = async () => {
    if (!requireToken()) return;
    setIsLoading(true);
    try {
      const [analyticsRes, playersRes, attemptsRes, gamesRes] = await Promise.all([
        fetch('/api/admin/analytics', { headers: authHeaders }),
        fetch('/api/admin/players', { headers: authHeaders }),
        fetch('/api/admin/attempts?limit=50', { headers: authHeaders }),
        fetch('/api/admin/games', { headers: authHeaders }),
      ]);

      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      else addToast('Failed to load analytics', 'error');

      if (playersRes.ok) {
        const body = await playersRes.json();
        setPlayers(body.players || []);
      } else {
        addToast('Failed to load players', 'error');
      }

      if (attemptsRes.ok) {
        const body = await attemptsRes.json();
        setAttempts(body.attempts || []);
      } else {
        addToast('Failed to load attempts', 'error');
      }

      if (gamesRes.ok) {
        const body = await gamesRes.json();
        setGameOverrides(body.overrides || []);
      }
    } catch (err) {
      addToast('Admin fetch failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (playerId: string, action: 'ban' | 'unban' | 'reset-score') => {
    if (!requireToken()) return;
    const res = await fetch('/api/admin/playerAction', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ playerId, action }),
    });
    if (!res.ok) {
      addToast(`Failed to ${action}`, 'error');
      return;
    }
    addToast(`Player ${action} success`, 'success');
    fetchAll();
  };

  const handleSaveOverride = async (override: GameOverride) => {
    if (!requireToken()) return;
    const res = await fetch('/api/admin/games', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(override),
    });
    if (res.ok) {
      addToast('Saved game override', 'success');
      fetchAll();
    } else {
      const body = await res.json().catch(() => ({}));
      addToast(body?.error?.message || 'Failed to save game', 'error');
    }
  };

  const overridesMap = useMemo(() => {
    const map = new Map<string, GameOverride>();
    gameOverrides.forEach(o => map.set(o.id, o));
    return map;
  }, [gameOverrides]);

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Players" value={analytics?.totalPlayers ?? 0} />
        <StatCard label="Active (7d)" value={analytics?.active7d ?? 0} />
        <StatCard label="Active (30d)" value={analytics?.active30d ?? 0} />
        <StatCard label="Attempts (7d)" value={analytics?.attempts7d ?? 0} />
        <StatCard label="Attempts (30d)" value={analytics?.attempts30d ?? 0} />
        <StatCard label="Repeat Players" value={analytics?.repeatPlayers ?? 0} />
        <StatCard label="Churned (14d)" value={analytics?.churned14d ?? 0} />
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-lg font-bold text-white mb-3">Top Games (by attempts)</h4>
        <div className="space-y-2">
          {(analytics?.gameStats || []).map(game => (
            <div key={game.gameId} className="flex justify-between text-sm text-gray-200 bg-gray-700 px-3 py-2 rounded">
              <div>
                <p className="font-semibold">{game.gameTitle}</p>
                <p className="text-xs text-gray-400">ID: {game.gameId}</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 font-bold">{game.attempts} attempts</p>
                <p className="text-gray-400 text-xs">Avg Score: {game.avgScore.toFixed(1)}</p>
              </div>
            </div>
          ))}
          {(analytics?.gameStats || []).length === 0 && (
            <p className="text-gray-400 text-sm">No attempts yet.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPlayers = () => (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-white">Players</h4>
        <button className="text-sm text-cyan-400" onClick={fetchAll}>Refresh</button>
      </div>
      <div className="space-y-2">
        {players.map(p => (
          <div key={p.id} className="bg-gray-700 rounded p-3 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">{p.name}</p>
              <p className="text-xs text-gray-400">Score: {p.score} • Attempts: {p.totalAttempts} • Last: {p.lastAttemptAt ? new Date(p.lastAttemptAt).toLocaleString() : '—'}</p>
              <p className={`text-xs ${p.status === 'banned' ? 'text-red-400' : 'text-green-400'}`}>{p.status}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-gray-600 text-white text-xs" onClick={() => handleAction(p.id, 'reset-score')}>Reset Score</button>
              {p.status === 'banned' ? (
                <button className="px-3 py-1 rounded bg-green-600 text-white text-xs" onClick={() => handleAction(p.id, 'unban')}>Unban</button>
              ) : (
                <button className="px-3 py-1 rounded bg-red-600 text-white text-xs" onClick={() => handleAction(p.id, 'ban')}>Ban</button>
              )}
            </div>
          </div>
        ))}
        {players.length === 0 && <p className="text-gray-400 text-sm">No players yet.</p>}
      </div>
    </div>
  );

  const renderAttempts = () => (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-white">Recent Attempts</h4>
        <button className="text-sm text-cyan-400" onClick={fetchAll}>Refresh</button>
      </div>
      <div className="space-y-2">
        {attempts.map(a => (
          <div key={a.attemptId} className="bg-gray-700 rounded p-3">
            <div className="flex justify-between">
              <div>
                <p className="text-white font-semibold">{a.playerName}</p>
                <p className="text-xs text-gray-400">{new Date(a.ts).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 text-sm font-bold">{a.score}/100</p>
                <p className="text-xs text-gray-400">{a.gameTitle}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-2 line-clamp-3">{a.submission}</p>
          </div>
        ))}
        {attempts.length === 0 && <p className="text-gray-400 text-sm">No attempts yet.</p>}
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="space-y-3">
      {baseGames.map(game => {
        const override = overridesMap.get(game.id) || { id: game.id, featured: false, active: true };
        return (
          <div key={game.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-white font-semibold">{game.title}</p>
                <p className="text-xs text-gray-400">ID: {game.id}</p>
                <p className="text-gray-300 text-sm mt-2">{override.description || game.description}</p>
              </div>
              <div className="flex gap-2">
                <label className="flex items-center gap-1 text-sm text-gray-200">
                  <input
                    type="checkbox"
                    checked={override.active !== false}
                    onChange={e => setGameOverrides(prev => {
                      const next = [...prev.filter(o => o.id !== game.id), { ...override, id: game.id, active: e.target.checked }];
                      return next;
                    })}
                  />
                  Active
                </label>
                <label className="flex items-center gap-1 text-sm text-gray-200">
                  <input
                    type="checkbox"
                    checked={Boolean(override.featured)}
                    onChange={e => setGameOverrides(prev => {
                      const next = [...prev.filter(o => o.id !== game.id), { ...override, id: game.id, featured: e.target.checked }];
                      return next;
                    })}
                  />
                  Featured
                </label>
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs text-gray-400">Prompt Template Override</label>
              <textarea
                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded p-2 text-sm text-gray-100"
                rows={4}
                placeholder="Optional: replace prompt"
                value={override.prompt_template || ''}
                onChange={e => setGameOverrides(prev => {
                  const next = [...prev.filter(o => o.id !== game.id), { ...override, id: game.id, prompt_template: e.target.value }];
                  return next;
                })}
              />
            </div>
            <div className="flex justify-end mt-3">
              <button
                className="px-3 py-1 bg-cyan-600 text-white rounded text-sm"
                onClick={() => handleSaveOverride(override)}
              >
                Save Override
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400">Admin Dashboard</h2>
          <p className="text-gray-400 text-sm">Monitor players, games, and moderation.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Admin name (for audit log)"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100"
            value={adminActor}
            onChange={e => setAdminActor(e.target.value)}
          />
          <input
            type="password"
            placeholder="Admin token"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100"
            value={adminToken}
            onChange={e => setAdminToken(e.target.value)}
          />
          <button className="px-3 py-2 bg-cyan-600 text-white rounded text-sm" onClick={fetchAll} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load'}
          </button>
          <button
            className="px-3 py-2 bg-gray-700 text-white rounded text-sm"
            onClick={() => {
              setAdminToken('');
              setAdminActor('admin');
              localStorage.removeItem('admin_token');
              localStorage.removeItem('admin_actor');
              addToast('Admin token cleared', 'info');
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <TabButton label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <TabButton label="Players" active={activeTab === 'players'} onClick={() => setActiveTab('players')} />
        <TabButton label="Submissions" active={activeTab === 'attempts'} onClick={() => setActiveTab('attempts')} />
        <TabButton label="Games" active={activeTab === 'games'} onClick={() => setActiveTab('games')} />
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'players' && renderPlayers()}
      {activeTab === 'attempts' && renderAttempts()}
      {activeTab === 'games' && renderGames()}
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const TabButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded text-sm font-semibold ${active ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}
  >
    {label}
  </button>
);

export default AdminPage;
