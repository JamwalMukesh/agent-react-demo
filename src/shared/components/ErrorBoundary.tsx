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

/**
 * Error Boundary component for graceful error handling
 * Wraps feature-level components to catch rendering errors
 */
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
    // Log error for monitoring/debugging
    console.error('Error Boundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center gap-4 p-6 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="text-lg font-bold text-red-800">Something went wrong</h2>
            <p className="text-sm text-red-700">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="
                px-4 py-2
                bg-red-600
                text-white
                rounded-md
                hover:bg-red-700
                transition-colors
              "
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
