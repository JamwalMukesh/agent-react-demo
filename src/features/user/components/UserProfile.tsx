import React from 'react';
import type { User } from '../types';
import { UserAvatar } from './UserAvatar';
import { UserInfo } from './UserInfo';

type UserProfileProps = {
  user: User;
  onEdit?: () => void;
};

/**
 * UserProfile - Main user profile component
 * Displays comprehensive user information with avatar and details
 */
export const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return (
    <div className="
      w-full
      max-w-2xl
      rounded-lg
      border
      border-gray-200
      bg-white
      shadow-md
      overflow-hidden
      
      md:shadow-lg
    ">
      {/* Header with avatar and name */}
      <div className="
        flex
        flex-col
        items-center
        gap-4
        p-6
        bg-gradient-to-b
        from-blue-50
        to-white
        
        sm:gap-6
        md:p-8
      ">
        <UserAvatar src={user.avatar} name={user.name} size="lg" />
        
        <div className="text-center">
          <h1 className="
            text-2xl
            font-bold
            text-gray-900
            
            sm:text-3xl
          ">
            {user.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            User ID: {user.id.slice(0, 8)}...
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 md:p-8">
        <UserInfo user={user} />
      </div>

      {/* Actions footer */}
      <div className="
        flex
        items-center
        justify-between
        gap-4
        p-6
        bg-gray-50
        border-t
        border-gray-200
        
        md:p-8
      ">
        <p className="text-xs text-gray-500">
          Profile ID: {user.id}
        </p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="
              px-4
              py-2
              bg-blue-600
              text-white
              text-sm
              font-medium
              rounded-md
              hover:bg-blue-700
              active:bg-blue-800
              transition-colors
              
              md:px-6
            "
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
