import { useEffect, useState } from 'react';
import { METAMASK_CODE_NAME, METAMASK_MESSAGE } from 'data/appInfo/message';
import { getContract, getProvider, switchEvmosChain } from 'config/contract';
import { Contracts } from 'type/contract';
import { useWalletState } from '../../../contexts/WalletContext';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';


const useMetaMask = () => {

  const { onChangeAddress, address, onChangeEvmosBalance } = useWalletState();

  useEffect(() => {
    address && getBalance();
  }, [address]);

  async function connectWallet() {
    if (address) {
      if(confirm('연결 해제하시겠습니까?')){
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
      console.log('METAMASK ::: ', err)
      if (err.code) {
        alert(METAMASK_MESSAGE[METAMASK_CODE_NAME[err.code.toString()]]);
      } else {
        alert(METAMASK_MESSAGE.unavailable);
      }
    }
  }

  function getBalance() {
    (async () => {
      const provider: Web3Provider = getProvider();
      const balance: BigNumber = await provider.getBalance(address);
      console.log(ethers.utils.formatEther(balance));
      onChangeEvmosBalance(ethers.utils.formatEther(balance));
      // const tokenContract = getContract(Contracts.token);
      // const balance = await tokenContract.balanceOf(address)
      // setBalance(balance / Math.pow(10, 18));
    })()
  }

  return {
    connectWallet
  };
};

export default useMetaMask;
