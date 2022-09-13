import type { FC, ReactNode } from 'react';
import s from './Main.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import MetaMask from '../common/MetaMask';
import Menu from './Menu';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useWalletState } from '../../contexts/WalletContext';
import { APP_ENV } from '../../config/environments';
import useWindowSize from '../../hooks/useWindowSize';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import { getContract } from '../../config/contract';
import { Contracts } from '../../type/contract';
import { convertUnitFrom } from '../../utils/numberFormats';
import { Contract } from 'ethers';

interface MainProps {
  children: ReactNode;
  title?: string;
}

let swapContract: Contract;

const Main: FC<MainProps> = ({ children, title }) => {
  const [USDCRatio, setUSDCRatio] = useState<number>(1);
  const { isPending } = useWalletState();
  const { pathname } = useRouter();
  const size = useWindowSize();
  const { onChangeIsPendingState } = useWalletState();

  async function loadRatio() {
    const _evmosPriceBps = await swapContract.EVMOSpriceBps();
    const evmosPriceBps = convertUnitFrom(_evmosPriceBps, '0');
    setUSDCRatio(Number(evmosPriceBps) / 10000);
  }

  function onMoveToDashboard() {
    window.location.replace('/');
  }

  useEffect(() => {
    swapContract = getContract(Contracts.MockSwap);
    (async () => await loadRatio())();
    console.log('APP_ENV:: ', APP_ENV);
  }, []);

  useEffect(() => {
    onChangeIsPendingState(false);
  }, [pathname]);

  if (isMobile) {
    return (
      <div className={s.emptyContainer}>
        <div className={s.logoRow}>
          <Image src="/img/logo/logo.png" alt="sooho.io" width={105} height={105} />
        </div>
        <div className={s.contentRow}>
          <span className={s.logoText}>
            It is not currently supported on mobile devices.
            <br /> Please connect to the desktop
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Head>
        <title>{title || 'Evmos StayKing House'}</title>
      </Head>
      <header>
        <div onClick={() => onMoveToDashboard()} style={{ cursor: 'pointer' }}>
          <Image src="/img/logo/logo.png" alt="sooho.io" width={36} height={36} />
          <span className={s.logoTextWrapper}>
            <span className={s.logoText}>Evmos StayKing House</span>
          </span>
        </div>
        <div className={s.coinPriceContainer}>
          <div className={s.coinPriceInfo}>
            <div className={s.coinPrice}>
              <img className={s.coinTickerImg} src={'/img/logo/evmos.png'} alt={'evmos'} />
              <p className={s.coinValue}>{1}</p>
            </div>
            <div className={s.verticalDivider}>:</div>
            <div className={s.coinPrice}>
              <img className={s.coinTickerImg} src={'/img/logo/usdc.png'} alt={'usdc'} />
              <p className={s.coinValue}>{USDCRatio.toFixed(4)}</p>
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
    </div>
  );
};

export default Main;
