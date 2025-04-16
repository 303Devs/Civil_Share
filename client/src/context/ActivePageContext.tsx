import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ActivePageContext = createContext<ActivePageContextType | null>(null);

export const ActivePageContextProvider = ({
  children,
}: ContextProviderProps) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState('dashboard');

  useEffect(() => {
    // let path = pathname.slice(1)

    if (pathname === '/') {
      setIsActive('home');
    } else {
      setIsActive(pathname.slice(1));
    }
  }, [pathname]);

  const setActivePage = (page: string) => setIsActive(page);

  return (
    <ActivePageContext.Provider
      value={{
        isActive,
        setActivePage,
      }}
    >
      {children}
    </ActivePageContext.Provider>
  );
};

// This is the custom hook to use the ContractContext
export const useActivePageContext = () => {
  const context = useContext(ActivePageContext);

  if (!context) {
    throw new Error('No ActivePage Context');
  }

  return context;
};
