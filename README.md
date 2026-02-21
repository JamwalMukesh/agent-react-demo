# React + Vite + TypeScript - Feature-Based Architecture

A modern React application scaffolded with Vite, TypeScript, Tailwind CSS, and Vitest, using a feature-based folder structure optimized for AI-assisted development.

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode
npm run test:ui          # Run tests with interactive UI
npm run test:coverage    # Generate coverage report

# Linting
npm run lint             # Check for ESLint errors
```

## Project Structure

This project uses a **Feature-Based Architecture** for better organization and scalability:

```
src/
├── features/              # Feature modules (self-contained)
│   ├── counter/          # Example feature: counter
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── types/        # TypeScript types
│   │   ├── __tests__/    # Unit tests
│   │   └── index.ts      # Public API
│   │
│   └── auth/             # Example feature: auth
│       ├── components/
│       ├── hooks/
│       ├── types/
│       ├── __tests__/
│       └── index.ts
│
├── shared/               # Shared utilities
│   ├── components/       # Shared UI components
│   ├── hooks/           # Shared custom hooks
│   ├── utils/           # Utility functions
│   ├── types/           # Global types
│   └── constants/       # Constants
│
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles (Tailwind)
```

For detailed architecture documentation, see [AGENTS.md](./AGENTS.md).

## Technology Stack

- **React 19.2** - UI framework
- **Vite 7.3** - Build tool with HMR
- **TypeScript 5.9** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Vitest 4** - Unit testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code quality

## Key Features

✨ **Feature-Based Architecture** - Modular, scalable structure  
📦 **Path Aliases** - `@` alias for clean imports  
🎨 **Tailwind CSS** - Zero-runtime styling  
⚡ **HMR** - Instant hot module replacement  
🧪 **Vitest** - Lightning-fast unit tests  
📋 **Type Safe** - Full TypeScript support  

## Adding a New Feature

1. Create feature directory:
   ```bash
   mkdir -p src/features/my-feature/{components,hooks,types,__tests__}
   ```

2. Create barrel export `src/features/my-feature/index.ts`:
   ```typescript
   export * from './components';
   export * from './hooks';
   export type * from './types';
   ```

3. Implement your feature components and hooks
4. Add tests in `__tests__/`
5. Import in App.tsx or other features:
   ```typescript
   import { MyComponent } from '@/features/my-feature';
   ```

See [AGENTS.md](./AGENTS.md) for complete guidelines.

## Styling

All styles use **Tailwind CSS**. No CSS files needed for components:

```tsx
<div className="flex items-center gap-4 p-6 bg-blue-500 text-white rounded">
  Content
</div>
```

## Testing

Run tests with Vitest:

```bash
npm run test              # Watch mode
npm run test:ui           # Interactive UI
npm run test:coverage     # Coverage report
```

Example test:
```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/features/counter';

describe('useCounter', () => {
  it('should increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});
```

## Development Tips

- **Path Aliases**: Use `@/` for absolute imports
- **HMR**: Changes are reflected instantly without refresh
- **TypeScript**: All code must be properly typed
- **Components**: Keep components focused and testable
- **Hooks**: Extract logic into custom hooks

## Contributing

When working with AI agents, follow the conventions in [AGENTS.md](./AGENTS.md):
- Maintain feature-based structure
- Use barrel exports for public APIs
- Keep features self-contained
- Add tests for new functionality
- Use TypeScript for type safety

## Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest](https://vitest.dev)
- [AGENTS.md](./AGENTS.md) - Architecture guide for AI agents

---

**Built with ❤️ for feature-based, agent-friendly React development**
