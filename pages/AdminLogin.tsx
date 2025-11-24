import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { storage } from '../utils/localStorage';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'nimda' && password === 'tutam') {
      setIsAuthenticated(true);
      setError('');
      storage.set('admin_session', 'true');
    } else {
      setError('Invalid username or password');
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    storage.remove('admin_session');
    setUsername('');
    setPassword('');
    setError('');
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full mb-4 shadow-lg">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400">Enter your credentials to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-600 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Secure Admin Portal • Find Love Now Management System
        </p>
      </div>
    </div>
  );
};
