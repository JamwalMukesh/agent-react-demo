# Agent React Demo - Architecture Guide

## Project Overview

This is a **Feature-Based Architecture** React + Vite + TypeScript project scaffolded for agent-assisted development. The structure prioritizes modularity, scalability, and collaboration with AI agents.

## Stack

- **React 19.2** - UI library
- **Vite 7.3** - Lightning-fast build tool
- **TypeScript 5.9** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vitest** - Fast unit testing
- **Testing Library** - React component testing utilities

## Folder Structure

```
src/
├── features/                    # Feature modules (self-contained features)
│   ├── counter/               # Example feature: counter
│   │   ├── components/        # Feature-specific React components
│   │   ├── hooks/             # Feature-specific custom hooks
│   │   ├── types/             # Feature-specific TypeScript types
│   │   ├── __tests__/         # Feature unit tests
│   │   └── index.ts           # Public API (barrel export)
│   │
│   └── auth/                  # Example feature: authentication
│       ├── components/        # Auth-specific components
│       ├── hooks/             # Auth-specific hooks (useAuth, etc.)
│       ├── types/             # Auth-specific types (User, AuthState, etc.)
│       ├── __tests__/         # Auth unit tests
│       └── index.ts           # Public API for auth
│
├── shared/                      # Shared across features
│   ├── components/            # Shared UI components (Layout, etc.)
│   ├── hooks/                 # Shared custom hooks
│   ├── utils/                 # Utility functions
│   ├── types/                 # Shared TypeScript types
│   └── constants/             # Shared constants
│
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
├── index.css                    # Global styles (Tailwind)
└── assets/                      # Static assets
```

## Key Concepts

### Feature Module Pattern

Each feature is self-contained with:
- **Components**: React components for the UI
- **Hooks**: Custom React hooks for logic
- **Types**: TypeScript interfaces and types
- **Tests**: Unit tests in `__tests__` folder
- **Index**: Public API barrel export

**Import from features:**
```tsx
// ✅ Good
import { Counter } from '@/features/counter';
import { useAuth } from '@/features/auth';

// ❌ Avoid internal imports
import { useCounter } from '@/features/counter/hooks/useCounter';
```

### Shared Utilities

The `shared/` folder contains:
- Common components (Layout, Buttons, etc.)
- Reusable hooks
- Utility functions
- Global types and constants

**Never put feature-specific code in shared.**

### Path Aliases

The `@` alias points to `src/`:
```tsx
import { Layout } from '@/shared/components';
import { Counter } from '@/features/counter';
```

Configured in:
- `vite.config.ts`
- `tsconfig.app.json`
- `vitest.config.ts`

## Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Testing
npm run test          # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report

# Linting
npm run lint          # Check for ESLint errors
npm run preview       # Preview production build
```

## Adding a New Feature

1. Create feature directory under `src/features/my-feature/`
2. Add subdirectories:
   ```bash
   mkdir -p src/features/my-feature/{components,hooks,types,__tests__}
   ```
3. Create `index.ts` barrel export:
   ```tsx
   export * from './components';
   export * from './hooks';
   export type * from './types';
   ```
4. Implement components, hooks, and types
5. Add tests in `__tests__/`
6. Import from feature in App or other features/components

## Styling with Tailwind

All styles use **Tailwind CSS classes**. No CSS files needed for components.

```tsx
// ✅ Good
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// ❌ Avoid
<button style={{ padding: '0.5rem 1rem' }}>Click me</button>
```

## Testing with Vitest

Tests go in `__tests__` folder with `.test.ts` or `.test.tsx` extension.

Example test:
```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../hooks';

describe('useCounter', () => {
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

## Rules for AI Agents

### When Modifying Code
1. Respect the feature-based structure
2. Keep features self-contained and independent
3. Use barrel exports (`index.ts`) for public APIs
4. Prefer shared utilities over duplicating code
5. Use TypeScript types for all parameters and returns

### When Adding Features
1. Create feature directory with standard structure
2. Include tests for new hooks/functions
3. Document feature purpose in a comment
4. Export public API in feature's `index.ts`
5. Update this AGENTS.md if adding new conventions

### Naming Conventions
- **Folders**: kebab-case (e.g., `my-feature`)
- **Components**: PascalCase (e.g., `Counter.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useCounter.ts`)
- **Types**: PascalCase interfaces (e.g., `CounterState`)
- **Tests**: Same name as source + `.test.ts` (e.g., `useCounter.test.ts`)

### Import Order
```tsx
// 1. React imports
import React from 'react';

// 2. External library imports
import { someLib } from 'some-library';

// 3. Shared imports
import { Layout } from '@/shared/components';

// 4. Feature imports
import { Counter } from '@/features/counter';
```

## Development Tips

### Hot Module Replacement (HMR)
Vite provides fast HMR. Changes to components/styles reflect instantly without full page reload.

### TypeScript Strict Mode
This project uses TypeScript strict mode. All code must be properly typed.

### Path Alias Usage
Always use `@` alias for absolute imports instead of relative paths:
- ✅ `import { Layout } from '@/shared/components';`
- ❌ `import { Layout } from '../shared/components';`

## Tools & Integration

- **ESLint**: Lints TypeScript and React code
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing (autoprefixer, tailwind)
- **Vitest**: Unit testing (Vite-native test runner)
- **Testing Library**: React component testing utilities

## Next Steps

1. Run `npm run dev` to start development server
2. Open http://localhost:5173 in browser
3. Modify components and see hot updates
4. Run `npm run test` to verify tests pass
5. Create new features following the pattern above

## Future Enhancements

Consider adding:
- State management (Redux, Zustand, Jotai)
- API integration layer
- Global error handling
- Logging strategy
- Internationalization (i18n)
- Environment configuration
- CI/CD pipeline configuration

---

**Last Updated**: February 2026
**Architecture Pattern**: Feature-Based (Modular Architecture)
