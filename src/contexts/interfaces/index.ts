import { ReactNode } from 'react';

export interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface IWalletContext {
  address: string;
  onChangeAddress: (_newAddress: string) => void;
  onChangeEvmosBalance: (_evmosBalance: string) => void;
  evmosBalance: string;
}

export interface Props {
  children: ReactNode;
}
