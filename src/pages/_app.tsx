import type { AppProps } from 'next/app';
import 'config/contract';
import 'styles/globals.scss';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { WalletContextProvider } from '../contexts/WalletContext';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    ethereum: any;
  }
}

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={10000}
        onClose={() => {
          console.log('closed...');
        }}>
        <ThemeContextProvider>
          <WalletContextProvider>
            <Component {...pageProps} />
          </WalletContextProvider>
        </ThemeContextProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};
