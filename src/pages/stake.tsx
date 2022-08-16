import type { NextPage } from 'next';
import Main from '../components/layout/Main';
import Stake from '../components/feature/Staking';

const Home: NextPage = () => {
  return (
    <Main>
      <Stake />
    </Main>
  );
};

export default Home;
