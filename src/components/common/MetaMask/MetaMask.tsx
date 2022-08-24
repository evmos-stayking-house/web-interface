import type { FC } from 'react';
import { cn } from 'utils/style';
import s from './MetaMask.module.scss';
import { useWalletState } from '../../../contexts/WalletContext';
import { useModal } from '../../Modal';
import WalletSelection from '../../Modal/ModalContents/WalletSelection/WalletSelection';
import useMetaMask from './MetaMask.service';
import { useEffect, useState } from 'react';

interface MetaMaskProps {}

interface ProviderMessage {
  type: string;
  data: unknown;
}

interface ConnectInfo {
  chainId: string;
}

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

const MetaMask: FC<MetaMaskProps> = () => {
  const { address, onChangeAddress } = useWalletState();
  const { connectWallet } = useMetaMask();
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const { openModal, closeModal, renderModal } = useModal({
    content: <WalletSelection closeModal={() => closeModal()} metaMaskLogin={connectWallet} />
  });

  function registerEvents() {
    if (window.ethereum !== undefined) {
      window.ethereum.on('accountsChanged', handleAccountChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('message', handleMessage);
      window.ethereum.on('connect', handleConnect);
      window.ethereum.on('disconnect', handleDisconnect);

      console.log(`metamask events are registered`);
    }
  }

  function removeRegisterEvents() {
    window.ethereum.removeListener('accountsChanged', handleAccountChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
    window.ethereum.removeListener('message', handleMessage);
    window.ethereum.removeListener('connect', handleConnect);
    window.ethereum.removeListener('disconnect', handleDisconnect);
    console.log(`METAMASK::: metamask events are unregistered`);
  }

  function handleConnect(connectInfo: ConnectInfo) {
    console.log(`METAMASK.EVENT.CONNECT::: `, connectInfo);
  }
  function handleDisconnect(error: ProviderMessage) {
    console.log(`METAMASK.EVENT.DISCONNECT:::`, error);
  }

  function handleMessage(message: ProviderMessage) {
    console.log('METAMASK.EVENT.MESSAGE::: ', message);
  }

  function handleAccountChanged(accounts: any) {
    console.log(`METAMASK.EVENT.ACCOUNT_CHANGED::: `, accounts[0]);
    onChangeAddress(accounts[0]);
  }

  function handleChainChanged(chainId: string) {
    console.log(`METAMASK.EVENT.CHAIN_CHANGED::: ${chainId}`);
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  }

  const hasMetaMask = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    registerEvents();
    setIsMetaMaskInstalled(hasMetaMask);
    return () => removeRegisterEvents();
  }, []);

  return (
    <div>
      <div
        className={cn(s.btn, { [s.notConnected]: !address })}
        onClick={() => (address ? connectWallet() : openModal())}>
        <span>{address || 'Connect Wallet First'}</span>
      </div>
      {!address && <div className={s.dim} />}
      {!isMetaMaskInstalled && <div className={s.dim} />}
      {renderModal()}
    </div>
  );
};

export async function getStaticProps() {
  console.log(process.env);
}

// MetaMask.st
export default MetaMask;
