import { useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import type { User } from '../types';
import { fetchUser, fetchUsers, searchUsers } from '@/shared/api/users';

// Query key factory for better cache management
const userQueryKeys = {
  all: ['users'] as const,
  detail: (userId: string) => [...userQueryKeys.all, 'detail', userId] as const,
  list: (page?: number, pageSize?: number) =>
    [...userQueryKeys.all, 'list', page, pageSize] as const,
  search: (query: string) => [...userQueryKeys.all, 'search', query] as const,
};

/**
 * Custom hook to fetch a single user by ID
 * @param userId - The user ID to fetch
 * @returns Query result with user data, loading state, and error
 */
export const useUser = (userId: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: userQueryKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Only fetch if userId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Custom hook to fetch paginated users
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of users per page
 */
export const useUsers = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: userQueryKeys.list(page, pageSize),
    queryFn: () => fetchUsers(page, pageSize),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Custom hook to search users
 * @param query - Search query string
 */
export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: userQueryKeys.search(query),
    queryFn: () => searchUsers(query),
    enabled: !!query.trim(), // Only search if query is not empty
    staleTime: 3 * 60 * 1000, // 3 minutes for search results
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Custom hook to manage user cache invalidation
 * Useful for invalidating cache after mutations
 */
export const useUserCache = () => {
  const queryClient = useQueryClient();

  return {
    invalidateUser: (userId: string) =>
      queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(userId) }),
    invalidateUsers: () =>
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all }),
  };
};
