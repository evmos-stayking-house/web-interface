import type { AppProps } from 'next/app';
import useSWR from 'swr';
import 'config/contract';
import 'styles/globals.scss';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { WalletContextProvider } from '../contexts/WalletContext';
import { createTheme, NextUIProvider } from '@nextui-org/react';

declare global {
  interface Window {
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <ThemeContextProvider>
        <WalletContextProvider>
          <Component {...pageProps} />
        </WalletContextProvider>
      </ThemeContextProvider>
    </NextUIProvider>
  );
}

const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#242424',
      background: '#242424'
    },
    space: {},
    fonts: {}
  }
});

export default MyApp;
