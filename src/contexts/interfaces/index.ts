import { ReactNode } from 'react';

export interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface Props {
  children: ReactNode;
}
