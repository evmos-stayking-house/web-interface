import type { FC, ReactNode } from 'react';
import s from './Main.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import MetaMask from '../common/MetaMask';
import useDashboard from '../feature/Dashboard/Dashboard.Service';
import Menu from './Menu';

interface MainProps {
  children: ReactNode;
  title?: string;
}

const Main: FC<MainProps> = ({ children, title }) => {
  const {setBalance, setAddress} = useDashboard();
  return (
      <div className={s.container}>
        <Head>
          <title>{title || 'Evmos StayKing House'}</title>
        </Head>
        <header>
          <div>
            <Image src="/img/logo/logo.png" alt="sooho.io" width={36} height={36}/>
            <span className={s.logoTextWrapper}>
              <span className={s.logoText}>Evmos StayKing House</span>
            </span>
          </div>
          <MetaMask changeBalance={setBalance} changeAddress={setAddress}/>
        </header>
        <main>
          <Menu>
            <Menu.Item label={'Dashboard'} url={'/'} />
            <Menu.Item label={'Lend'} url={'/lend'} />
            <Menu.Item label={'Stake'} url={'/stake'} />
          </Menu>
          <div className={s.contents}>
            {children}
          </div>
        </main>
      </div>
  )
};

export default Main;
