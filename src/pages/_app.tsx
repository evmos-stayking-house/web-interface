import type { AppProps } from 'next/app';
import 'config/contract';
import 'styles/globals.scss';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { WalletContextProvider } from '../contexts/WalletContext';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import PropTypes from 'prop-types';

declare global {
  interface Window {
    ethereum: any;
  }
}

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContextProvider>
        <WalletContextProvider>
          <Component {...pageProps} />
        </WalletContextProvider>
      </ThemeContextProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};
