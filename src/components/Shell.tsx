
import React, { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};
