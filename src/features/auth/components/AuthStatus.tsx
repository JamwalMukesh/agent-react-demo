import React from 'react';
import { useAuth } from '../hooks';

export const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Auth Status</h2>
      {isAuthenticated && user ? (
        <div className="space-y-4">
          <p className="text-lg">
            Welcome, <span className="font-bold">{user.name}</span>
          </p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">Not authenticated</p>
          <button
            onClick={() => login('user@example.com', 'password')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
