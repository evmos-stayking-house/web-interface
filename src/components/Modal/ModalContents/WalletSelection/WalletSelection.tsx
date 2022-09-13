import type { FC } from 'react';
import { useEffect, useState } from 'react';

import s from './WalletSelection.module.scss';

interface Props {
  closeModal?: VoidFunction;
  metaMaskLogin: VoidFunction;
}

const WalletSelection: FC<Props> = ({ closeModal, metaMaskLogin }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  const hasMetaMask = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    setIsMetaMaskInstalled(hasMetaMask);
  }, []);

  function onMetaMaskLogin() {
    metaMaskLogin();
    closeModal!();
  }

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <img src={'/img/logo/logo.png'} className={s.logoContainer__logo} alt={'로고'} />
      </div>
      <h3 className={s.title}>Connect Wallet</h3>
      <p className={s.loginDesc}>Hello! Connect your Metamask wallet to start the application.</p>
      <div className={s.walletContainer} onClick={() => (isMetaMaskInstalled ? onMetaMaskLogin() : {})}>
        <div className={s.wallet}>
          {isMetaMaskInstalled && <span className={s.walletName}>MetaMask</span>}
          {!isMetaMaskInstalled && (
            <span className={s.walletName}>
              Please Install Metamask Extension First ►{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1b69fb' }}
                href={'https://metamask.io/download/'}>
                Download
              </a>
            </span>
          )}
          <img className={s.logo} src={'/img/metamask.png'} alt={'metamask icon'} />
        </div>
      </div>
      <div className={s.divider}></div>
      <span className={s.otherText}>or Login With</span>
      <div
        className={s.walletContainer}
        onClick={() => {
          alert('The service is currently unavailable');
        }}>
        <div className={s.wallet}>
          <span className={s.walletName}>Google</span>
          <img className={s.logo} src={'/img/google.png'} alt={'google icon'} />
        </div>
      </div>
    </div>
  );
};

export default WalletSelection;
