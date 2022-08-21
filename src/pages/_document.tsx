import { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="true"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.4/dist/web/static/pretendard.css"
        />
        <meta property="og:title" content="Evmos StayKing House" />
        <meta property="og:description" content="To Earn.. Just StakeM.." />
        <meta property="og:image" content="/img/logo/logo.png" />
        <meta property="og:image" content="https://cdn.sooho.io/img/hackathon/favicon.ico" />
        <title>EVMOS Stayking House</title>
      </Head>
      <body className="body">
        <Main />
        <div id="modal" />
        <NextScript />
        {CssBaseline.flush()}
      </body>
    </Html>
  );
}

export default Document;
