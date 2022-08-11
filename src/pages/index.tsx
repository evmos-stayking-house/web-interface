import type { NextPage } from 'next';
import Head from 'next/head';
import LogoBg from 'components/layout/LogoBg';
import Bridge from 'components/feature/Bridge';
import styles from 'styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div>
      <LogoBg>
        <Head>
          <title>Evmos StayKing House</title>
        </Head>

        <main className={styles.main}>
          <Bridge />
        </main>
      </LogoBg>
    </div>
  );
};

export default Home;
