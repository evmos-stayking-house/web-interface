import { useEffect } from 'react';
import { METAMASK_CODE_NAME, METAMASK_MESSAGE } from 'data/appInfo/message';
import { getProvider, switchEvmosChain } from 'config/contract';
import { useWalletState } from '../../../contexts/WalletContext';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';
import { useModal } from '../../Modal';
import WalletSelection from '../../Modal/ModalContents/WalletSelection/WalletSelection';

interface ProviderMessage {
  type: string;
  data: unknown;
}

interface ConnectInfo {
  chainId: string;
}

const useMetaMask = () => {
  const { onChangeAddress, address, onChangeEvmosBalance } = useWalletState();

  async function connectWallet() {
    if (address) {
      if (confirm('Are you sure you want to disconnect?')) {
        onChangeAddress('');
      }
      return;
    }

    try {
      const provider: Web3Provider = getProvider();
      await provider.send('eth_requestAccounts', []);
      await provider.send('wallet_requestPermissions', [{ eth_accounts: {} }]);
      const address = await provider.getSigner().getAddress();
      onChangeAddress(address);
    } catch (err: any) {
      console.log('METAMASK ::: ', err);
      if (err.code) {
        alert(METAMASK_MESSAGE[METAMASK_CODE_NAME[err.code.toString()]]);
      } else {
        alert(METAMASK_MESSAGE.unavailable);
      }
    }
  }

  const { openModal, closeModal, renderModal } = useModal({
    content: <WalletSelection closeModal={() => closeModal()} metaMaskLogin={connectWallet} />
  });

  function registerEvents() {
    window.ethereum.on('accountsChanged', handleAccountChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('message', handleMessage);
    window.ethereum.on('connect', handleConnect);
    window.ethereum.on('disconnect', handleDisconnect);

    console.log(`metamask events are registered`);
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
    window.location.reload();
  }

  function loadBalances() {
    (async (address) => {
      if (!address) return;
      const provider: Web3Provider = getProvider();
      const balance: BigNumber = await provider.getBalance(address);
      onChangeEvmosBalance(ethers.utils.formatEther(balance));
    })(address);
  }

  useEffect(() => {
    (async () => {
      if (!window?.ethereum) return;
      await switchEvmosChain();
      registerEvents();
    })();

    return () => window?.ethereum && removeRegisterEvents();
  }, []);

  useEffect(() => {
    (async () => {
      await loadBalances();
    })();
  }, [address]);

  return {
    connectWallet,
    openModal,
    renderModal,
    address
  };
};

export default useMetaMask;
