// context/LogContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface LogContextProps {
  enableLogs: boolean;
  toggleLogs: () => void;
}

// Create the context with default values
const LogContext = createContext<LogContextProps | undefined>(undefined);

// Create a provider component
export const LogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [enableLogs, setEnableLogs] = useState<boolean>(false);

  const toggleLogs = () => {
    setEnableLogs(prev => !prev);
  };

  return (
    <LogContext.Provider value={{ enableLogs, toggleLogs }}>
      {children}
    </LogContext.Provider>
  );
};

// Custom hook to use the LogContext
export const useLogContext = () => {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLogContext must be used within a LogProvider');
  }
  return context;
};
