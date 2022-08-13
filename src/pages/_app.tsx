import type { AppProps } from 'next/app';
import 'config/contract';
import 'styles/globals.scss';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { WalletContextProvider } from '../contexts/WalletContext';

declare global {
  interface Window {
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
