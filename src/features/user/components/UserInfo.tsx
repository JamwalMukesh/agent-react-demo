import React from 'react';
import type { User } from '../types';

type UserInfoProps = {
  user: User;
};

/**
 * UserInfo - Displays detailed user information
 */
export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const joinedDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-6">
      {/* User email */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Email
        </p>
        <p className="text-sm mt-1 text-gray-800">{user.email}</p>
      </div>

      {/* User bio if available */}
      {user.bio && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Bio
          </p>
          <p className="text-sm mt-1 text-gray-700">{user.bio}</p>
        </div>
      )}

      {/* Join date */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Member Since
        </p>
        <p className="text-sm mt-1 text-gray-800">{joinedDate}</p>
      </div>

      {/* Status indicator */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Status
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className={`
              w-2
              h-2
              rounded-full
              ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}
            `}
          />
          <span className="text-sm text-gray-800">
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};
