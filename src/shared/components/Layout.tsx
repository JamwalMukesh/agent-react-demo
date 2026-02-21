import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">React + Vite + Features</h1>
      </header>
      <main className="container mx-auto p-6">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2026 Agent React Demo. Feature-based architecture.</p>
      </footer>
    </div>
  );
};
