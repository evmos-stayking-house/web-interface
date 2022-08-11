import { Html, Head, Main, NextScript } from 'next/document';

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
      </Head>
      <body className="body">
        <Main />
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
