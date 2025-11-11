
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const NameModal: React.FC = () => {
  const [name, setName] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const { setPlayer, addToast } = useAppContext();

  const checkAvailability = async (candidate: string) => {
    if (!candidate.trim()) { setAvailable(null); return; }
    setChecking(true);
    try {
      const taken = await (await import('../services/supabaseService')).isNameTaken(candidate.trim());
      setAvailable(!taken);
    } catch {
      setAvailable(null);
    } finally {
      setChecking(false);
    }
  };

  let debounceTimer: number | undefined;
  const onNameChange = (v: string) => {
    setName(v);
    if (debounceTimer) window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => checkAvailability(v), 350);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      addToast('Please enter your name', 'error');
      return;
    }
    if (trimmedName.length < 2) {
      addToast('Name must be at least 2 characters', 'error');
      return;
    }
    if (trimmedName.length > 50) {
      addToast('Name must be less than 50 characters', 'error');
      return;
    }
    if (available === false) {
      addToast('This name is already taken. Please choose another.', 'error');
      return;
    }

    setPlayer({ name: trimmedName, score: 0, attempts: [] });
    addToast(`Welcome, ${trimmedName}! Ready to test your sourcing skills?`, 'success');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Welcome to the AI Sourcing Quiz!</h2>
        <p className="text-gray-300 mb-6">Please enter your full name to join the competition.</p>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Your Name"
              className={`w-full bg-gray-700 border rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 ${
                available === true ? 'border-green-500 focus:ring-green-500' :
                available === false ? 'border-red-500 focus:ring-red-500' :
                'border-gray-600 focus:ring-cyan-500'
              }`}
              required
              minLength={2}
              maxLength={50}
            />
            {checking && (
              <span className="absolute right-3 top-3 text-gray-400 text-sm">Checking...</span>
            )}
            {!checking && available === true && (
              <span className="absolute right-3 top-3 text-green-400 text-sm">✓ Available</span>
            )}
            {!checking && available === false && (
              <span className="absolute right-3 top-3 text-red-400 text-sm">✗ Taken</span>
            )}
          </div>
          <button
            type="submit"
            disabled={available === false || checking}
            className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Start Sourcing!
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;


