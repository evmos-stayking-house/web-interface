import { ReactNode } from 'react';

export interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: VoidFunction;
}

export interface IWalletContext {
  address: string;
  onChangeAddress: (_newAddress: string) => void;
  onChangeEvmosBalance: (_evmosBalance: string) => void;
  evmosBalance: string;
  isPending: boolean;
  onChangeIsPendingState: (_isPending: boolean) => void;
}

export interface Props {
  children: ReactNode;
}
