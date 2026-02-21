import React from 'react';

type UserAvatarProps = {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

/**
 * UserAvatar - Displays user profile picture with fallback
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return src ? (
    <img
      src={src}
      alt={name}
      className={`
        ${sizeClasses[size]}
        rounded-full
        object-cover
        border-2
        border-gray-200
      `}
    />
  ) : (
    <div
      className={`
        ${sizeClasses[size]}
        ${textSizeClasses[size]}
        rounded-full
        bg-blue-500
        text-white
        flex
        items-center
        justify-center
        font-bold
        border-2
        border-gray-200
      `}
    >
      {initials}
    </div>
  );
};
