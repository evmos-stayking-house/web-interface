import { ReactNode } from 'react';

export interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface IWalletContext {
  address: string;
  onChangeAddress: (_newAddress: string) => void;
}

export interface Props {
  children: ReactNode;
}
