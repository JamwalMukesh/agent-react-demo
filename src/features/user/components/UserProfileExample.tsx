import React from 'react';
import type { User } from '../types';

/**
 * Demo component showing how to use the User Profile feature
 * This is a usage example following the Senior Persona standards
 */

// Example: Using the useUser hook to fetch data
const UserProfileExample: React.FC = () => {
  // Import and use the hook
  // import { useUser } from '@/features/user';

  // const userId = '123e4567-e89b-12d3-a456-426614174000';
  // const { data: user, isLoading, error } = useUser(userId);

  // Mock user data for demonstration
  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://api.example.com/avatars/alice.jpg',
    bio: 'Full-stack developer passionate about building scalable applications',
    joinedAt: new Date('2023-06-15').toISOString(),
    isActive: true,
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">User Profile Example</h2>

      {/* Example code block */}
      <pre className="
        bg-gray-100
        p-4
        rounded-lg
        text-xs
        overflow-x-auto
        border
        border-gray-300
      ">
        {`import { useUser } from '@/features/user';
import { ErrorBoundary } from '@/shared/components';

export const MyComponent: React.FC = () => {
  const userId = '123e4567-e89b-12d3-a456-426614174000';
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return (
    <ErrorBoundary>
      <UserProfile user={user} onEdit={() => console.log('Edit')} />
    </ErrorBoundary>
  );
};`}
      </pre>

      {/* Display mock user data info */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> To use the actual User Profile feature, replace the mock data above
          with real API calls. The mock API base URL is set to{' '}
          <code className="bg-blue-100 px-2 py-1 rounded">https://api.example.com</code> —
          update this in <code className="bg-blue-100 px-2 py-1 rounded">src/shared/api/users.ts</code>
        </p>
      </div>

      {/* Mock user info display */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Mock User Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 uppercase font-semibold">Name</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{mockUser.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 uppercase font-semibold">Email</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{mockUser.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 uppercase font-semibold">Status</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {mockUser.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 uppercase font-semibold">Member Since</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {new Date(mockUser.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileExample;
