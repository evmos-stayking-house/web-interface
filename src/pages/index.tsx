import type { NextPage } from 'next';
import Dashboard from 'components/feature/Dashboard';
import Main from '../components/layout/Main';

const Home: NextPage = () => {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
};

export default Home;
