import { z } from 'zod';

// Zod schemas for User data validation
export const UserSchema = z.object({
  id: z.string().uuid('User ID must be a valid UUID'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().url('Invalid avatar URL').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  joinedAt: z.string().datetime('Invalid date format'),
  isActive: z.boolean().default(true),
});

// Type inference from schema
export type User = z.infer<typeof UserSchema>;

// Schemas for API responses
export const UserResponseSchema = UserSchema;
export const UserListSchema = z.array(UserSchema);

// Pagination schema
export const PaginatedUsersSchema = z.object({
  data: UserListSchema,
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

export type PaginatedUsers = z.infer<typeof PaginatedUsersSchema>;
