import type { FC, ReactNode } from 'react';
import s from './Main.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import MetaMask from '../common/MetaMask';
import Menu from './Menu';
import useCoinPrice from '../../hooks/useCoinPrice';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useWalletState } from '../../contexts/WalletContext';
import { APP_ENV } from '../../config/environments';
import useWindowSize from '../../hooks/useWindowSize';

interface MainProps {
  children: ReactNode;
  title?: string;
}

const Main: FC<MainProps> = ({ children, title }) => {
  const { coinPrice: cosmosPrice } = useCoinPrice(`cosmos`);
  const { coinPrice: evmosPrice } = useCoinPrice(`evmos`);
  const { coinPrice: usdcPrice } = useCoinPrice('usd-coin');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const { isPending } = useWalletState();
  const size = useWindowSize();

  const hasMetaMask = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    console.log('APP_ENV:: ', APP_ENV);
    setIsMetaMaskInstalled(hasMetaMask);
  }, []);

  return (
    <div className={s.container}>
      <Head>
        <title>{title || 'Evmos StayKing House'}</title>
      </Head>
      <header>
        <div>
          <Image src="/img/logo/logo.png" alt="sooho.io" width={36} height={36} />
          <span className={s.logoTextWrapper}>
            <span className={s.logoText}>Evmos StayKing House</span>
          </span>
        </div>
        <div className={s.coinPriceContainer}>
          <div className={s.coinPriceInfo}>
            <div className={s.coinPrice}>
              <img className={s.coinTickerImg} src={'/img/logo/usdc.png'} alt={'usdc'} />
              <p className={s.coinValue}>$ {usdcPrice.toFixed(2)}</p>
            </div>
            <div className={s.verticalDivider}></div>
            <div className={s.coinPrice}>
              <img className={s.coinTickerImg} src={'/img/logo/cosmos.png'} alt={'cosmos'} />
              <p className={s.coinValue}>$ {cosmosPrice.toFixed(2)}</p>
            </div>
            <div className={s.verticalDivider}></div>
            <div className={s.coinPrice}>
              <img className={s.coinTickerImg} src={'/img/logo/evmos.png'} alt={'evmos'} />
              <p className={s.coinValue}>$ {evmosPrice.toFixed(2)}</p>
            </div>
          </div>
          <MetaMask />
        </div>
      </header>
      <main>
        <Menu>
          <Menu.Item label={'Dashboard'} url={'/'} />
          <Menu.Item label={'Lend'} url={'/lend'} />
          <Menu.Item label={'Stake'} url={'/stake'} />
        </Menu>
        <div className={s.contents}>{children}</div>
      </main>
      {isPending && (
        <div className={s.dim}>
          <CircularProgress color="success" size={100} />
          <span className={s.text}>Loading....</span>
        </div>
      )}
      {size && size < 1024 && (
        <div className={s.dim}>
          <span className={s.text}>The resolution of the connected display screen is not supported.</span>
        </div>
      )}
      {!isMetaMaskInstalled && <div className={s.dim}>Metamask is not installed</div>}
    </div>
  );
};

export default Main;
