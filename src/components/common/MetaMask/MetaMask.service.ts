import { useEffect, useState } from 'react';
import { METAMASK_CODE_NAME, METAMASK_MESSAGE } from 'data/appInfo/message';
import { getProvider, switchEvmosChain } from 'config/contract';
import { useWalletState } from '../../../contexts/WalletContext';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';

const useMetaMask = () => {
  const { onChangeAddress, address, onChangeEvmosBalance } = useWalletState();

  useEffect(() => {
    address && loadBalances();
  }, [address]);

  async function connectWallet() {
    if (address) {
      if (confirm('연결 해제하시겠습니까?')) {
        onChangeAddress('');
      }
      return;
    }

    try {
      await switchEvmosChain();
      const provider: Web3Provider = getProvider();
      await provider.send('eth_requestAccounts', []);
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

  function loadBalances() {
    (async (address) => {
      if (!address) return;

      const provider: Web3Provider = getProvider();
      const balance: BigNumber = await provider.getBalance(address);
      const swapHelperBalance = await provider.getBalance('0x68B1D87F95878fE05B998F19b66F4baba5De1aed');
      console.log('swapHelper EVMOS Balance: ', ethers.utils.formatEther(swapHelperBalance));
      onChangeEvmosBalance(ethers.utils.formatEther(balance));
    })(address);
  }

  return {
    connectWallet,
    loadBalances
  };
};

export default useMetaMask;
