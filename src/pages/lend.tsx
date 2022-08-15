import type { NextPage } from 'next';
import Main from '../components/layout/Main';
import Vault from '../components/feature/Vault';

const Home: NextPage = () => {
  return (
    <Main>
      <Vault />
    </Main>
  );
};

export default Home;
