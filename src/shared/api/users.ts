import type { User, PaginatedUsers } from '@/features/user/types';
import { UserResponseSchema, UserListSchema, PaginatedUsersSchema } from '@/features/user/types';

// Mock API base URL - replace with actual API endpoint
const API_BASE = 'https://api.example.com';

/**
 * Fetch a single user by ID
 * @param userId - The user ID to fetch
 * @returns Promise resolving to User data
 */
export const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/users/${userId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validate response with Zod
  return UserResponseSchema.parse(data);
};

/**
 * Fetch all users with pagination
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of users per page
 * @returns Promise resolving to paginated users
 */
export const fetchUsers = async (
  page = 1,
  pageSize = 10
): Promise<PaginatedUsers> => {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const response = await fetch(`${API_BASE}/users?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validate response with Zod
  return PaginatedUsersSchema.parse(data);
};

/**
 * Fetch users by search query
 * @param query - Search query
 * @returns Promise resolving to list of matching users
 */
export const searchUsers = async (query: string): Promise<User[]> => {
  if (!query.trim()) {
    return [];
  }
  
  const response = await fetch(`${API_BASE}/users/search?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to search users: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validate response with Zod
  return UserListSchema.parse(data);
};
