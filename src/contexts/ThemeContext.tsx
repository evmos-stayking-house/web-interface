import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { IThemeContext, Props } from './interfaces';

const defaultContext: IThemeContext = {
  isDarkMode: true,
  toggleDarkMode: () => {},
};

const ThemeContext = React.createContext<IThemeContext>(defaultContext);

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    localStorage.setItem('isDarkMode', String(isDarkMode));
    document!.querySelector('body')!.setAttribute('data-theme', isDarkMode ? 'dark-mode' : 'light-mode');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleDarkMode }}
    >
        {children}
    </ThemeContext.Provider>
  );
};

export const useThemeState = (): IThemeContext => {
  return useContext(ThemeContext);
};

