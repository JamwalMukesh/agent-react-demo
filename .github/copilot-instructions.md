# GitHub Copilot Instructions for React + Vite Project

This file defines the coding standards and best practices for the agent-react-demo project. All AI-assisted development should follow these guidelines to maintain code quality and consistency.

## Component Pattern

### Functional Components Only
- Use functional components exclusively
- Always provide explicit return types using `React.FC<Props>` or `() => JSX.Element`
- Keep components focused and single-purpose

```typescript
// ✅ Good
import React from 'react';

interface CounterProps {
  initialValue?: number;
  onCountChange?: (count: number) => void;
}

export const Counter: React.FC<CounterProps> = ({ 
  initialValue = 0, 
  onCountChange 
}) => {
  const [count, setCount] = React.useState(initialValue);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleIncrement}>+</button>
      <span>{count}</span>
    </div>
  );
};
```

### Composition Over Prop-Drilling
- Extract sub-components to avoid excessive prop-drilling
- Use component composition patterns (children, render props, slots)
- Provide a well-defined public API through barrel exports

```typescript
// ✅ Good - Composition
interface ListContainerProps {
  children: React.ReactNode;
}

const ListContainer: React.FC<ListContainerProps> = ({ children }) => (
  <div className="space-y-2">{children}</div>
);

const ListItem: React.FC<ListItemProps> = ({ item }) => (
  <div className="p-2 border rounded">{item.name}</div>
);

export const List: React.FC<ListProps> = ({ items }) => (
  <ListContainer>
    {items.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </ListContainer>
);

// ❌ Avoid - Excessive Prop-Drilling
export const ListWithDrilling: React.FC<Props> = ({ 
  items, 
  onSelect, 
  isLoading,
  error,
  theme,
  variant,
  // ... many more props
}) => {
  // Too many props passed down
};
```

## State Management

### TanStack Query for Server State
- Use **TanStack Query (React Query)** for all server-side state (API calls, caching, synchronization)
- Do NOT use Redux, Zustand, or Context API for server state
- Use local React state (useState) only for UI state

```typescript
// ✅ Good
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUsers, createUser } from '@/shared/api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// In component
export const UsersList: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};
```

### Zod for Schema Validation
- Validate all API responses with **Zod** schemas
- Parse responses at the API layer, not in components
- Define schemas in feature-specific `types` files

```typescript
// ✅ Good - src/features/users/types/index.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

export const UsersListSchema = z.array(UserSchema);

// src/shared/api/users.ts
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  const data = await response.json();
  
  // Validate and parse at API layer
  return UsersListSchema.parse(data);
};

// ❌ Avoid
export const UsersList: React.FC = () => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      return res.json(); // No validation!
    },
  });
};
```

## TypeScript

### Strict Mode Only
- TypeScript `strict` mode is **required**
- No `any` type - use proper typing
- Generate types from API schemas using Zod with `z.infer<>`

```typescript
// ✅ Good
import { z } from 'zod';

const ApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type ApiResponse = z.infer<typeof ApiResponseSchema>;

function processData(data: ApiResponse): void {
  console.log(data.name);
}

// ❌ Avoid
function processData(data: any): void {
  console.log(data.name); // Type-unsafe
}
```

### Type Over Interface
- Prefer `type` declarations over `interface`
- Use `interface` only for class implementations or when you need declaration merging

```typescript
// ✅ Good - Use type
type User = {
  id: string;
  name: string;
  email: string;
};

type Admin = User & {
  role: 'admin';
  permissions: string[];
};

// ✅ Acceptable - Interface for class
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

// ❌ Avoid - Interface for types
interface User {
  id: string;
  name: string;
  email: string;
}
```

### Type-Only Imports
- Use `import type` for types, interfaces, and enums
- Never mix type and value imports
- This reduces bundle size and clarifies intent

```typescript
// ✅ Good
import type { User, ApiResponse } from '@/features/users/types';
import type { ReactNode } from 'react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface ComponentProps {
  user: User;
  children: ReactNode;
}

export const UserCard: React.FC<ComponentProps> = ({ user, children }) => {
  return <div>{user.name}</div>;
};

// ❌ Avoid
import { User, ApiResponse } from '@/features/users/types'; // Don't do this
import React, { ReactNode } from 'react'; // Mix of type and value
```

## Styling

### Tailwind CSS with Mobile-First Approach
- Use Tailwind CSS utility classes exclusively - **no custom CSS files for components**
- Follow mobile-first responsive design pattern
- Use `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Create reusable component classes using `@apply` only in global styles if necessary

```typescript
// ✅ Good - Mobile-first
export const Card: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="
    p-4 
    rounded-lg 
    border 
    border-gray-200
    hover:shadow-md
    transition-shadow
    
    sm:p-6
    md:border-l-4 
    md:border-l-blue-500
    lg:p-8
  ">
    {children}
  </div>
);

// ✅ Good - Responsive Grid
export const Grid: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="
    grid 
    grid-cols-1 
    gap-4 
    
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4
    xl:gap-6
  ">
    {children}
  </div>
);

// ❌ Avoid - Desktop-first
<div className="p-8 sm:p-4">Content</div>

// ❌ Avoid - Custom CSS files
// ❌ Avoid - Inline styles
<div style={{ padding: '2rem' }}>Content</div>
```

### Tailwind Best Practices
- Group responsive classes together for readability
- Use semantic color classes: `text-red-500`, `bg-blue-100`
- Leverage Tailwind's spacing scale: `space-y-2`, `gap-4`, `p-6`
- Use dark mode class prefix if needed: `dark:bg-gray-900`

```typescript
// ✅ Good
<button className="
  px-4 py-2 
  bg-blue-500 
  text-white 
  rounded-lg 
  hover:bg-blue-600 
  active:bg-blue-700
  disabled:opacity-50 
  disabled:cursor-not-allowed
  transition-colors
  
  dark:bg-blue-600 
  dark:hover:bg-blue-700
">
  Click Me
</button>
```

## Error Handling

### Error Boundary Pattern
- Wrap feature-level components with Error Boundaries
- Create a global Error Boundary at the app root
- Provide graceful fallbacks and user-friendly error messages

```typescript
// ✅ Good - Error Boundary Component
import React from 'react';
import type { ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="text-red-800 font-bold">Something went wrong</h2>
            <p className="text-red-700">{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Usage in App.tsx
export const App: React.FC = () => (
  <ErrorBoundary>
    <MainContent />
  </ErrorBoundary>
);
```

### Custom Hooks for Logic Separation
- Extract logic into custom hooks to keep components lean
- Use hooks for complex state, side effects, and reusable logic
- Name hooks starting with `use`

```typescript
// ✅ Good - Custom hook for API logic
import { useQuery } from '@tanstack/react-query';
import type { User } from '@/features/users/types';
import { fetchUser } from '@/shared/api/users';

type UseUserParams = {
  userId: string;
};

export const useUser = ({ userId }: UseUserParams) => {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  return { user, isLoading, error };
};

// ✅ Good - Custom hook for UI state
export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = React.useState(initialOpen);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
};

// Component stays clean
export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { user, isLoading, error } = useUser({ userId });
  const { isOpen, open, close } = useModal();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!user) return null;

  return (
    <ErrorBoundary>
      <div className="p-6">
        <h1>{user.name}</h1>
        <button onClick={open}>Edit</button>
        {isOpen && <EditModal user={user} onClose={close} />}
      </div>
    </ErrorBoundary>
  );
};
```

## Project Organization

Maintain the feature-based architecture:

```
src/
├── features/
│   ├── [feature-name]/
│   │   ├── components/        # Feature-specific React components
│   │   ├── hooks/             # Feature-specific custom hooks
│   │   ├── types/             # Zod schemas + TypeScript types
│   │   ├── __tests__/         # Unit tests
│   │   └── index.ts           # Public API barrel export
│   │
├── shared/
│   ├── api/                   # API client functions with Zod validation
│   ├── components/            # Shared UI components
│   ├── hooks/                 # Shared custom hooks
│   ├── utils/                 # Utility functions
│   ├── types/                 # Shared type definitions
│   └── constants/             # Global constants
│
└── App.tsx                    # Root with ErrorBoundary
```

## Summary Checklist

When implementing or reviewing code:

- [ ] Functional components with explicit return types
- [ ] Composition pattern used, no excessive prop-drilling
- [ ] TanStack Query for server state, local state for UI
- [ ] Zod validation for all API responses
- [ ] TypeScript strict mode, no `any`
- [ ] `type` declarations preferred over `interface`
- [ ] Type-only imports used
- [ ] Tailwind CSS utility-first, mobile-first approach
- [ ] Error Boundaries at feature level and app root
- [ ] Custom hooks for logic separation
- [ ] Feature-based folder structure maintained
- [ ] Tests included in `__tests__` folders
- [ ] Full type safety throughout

---

**Last Updated**: February 2026  
**Project**: agent-react-demo  
**Architecture Pattern**: Feature-Based with Server-State Management
