import type { AppProps } from 'next/app';
import 'config/contract';
import 'styles/globals.scss';
import { ThemeContextProvider } from '../contexts/ThemeContext';

declare global {
  interface Window {
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
        <Component {...pageProps} />
    </ThemeContextProvider>
  );
}

export default MyApp;
