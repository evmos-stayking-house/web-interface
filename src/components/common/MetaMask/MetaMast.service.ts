import { useEffect, useState } from 'react';
import { METAMASK_CODE_NAME, METAMASK_MESSAGE } from 'data/appInfo/message';
import { getContract, getProvider } from 'config/contract';
import { Contracts } from 'type/contract';

const useMetaMask = (setBalance: Function, changeAddress: Function) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    address && getBalance();
  }, [address]);

  async function connectWallet() {
    if (address) {
      alert('연결 해제하시겠습니까?');
      return;
    }

    try {
      const provider = getProvider();
      await provider.send('eth_requestAccounts', []);
      const address = await provider.getSigner().getAddress();

      setAddress(address);
      changeAddress(address);
    } catch (err: any) {
      console.log(err)
      if (err.code) {
        alert(METAMASK_MESSAGE[METAMASK_CODE_NAME[err.code.toString()]]);
      } else {
        alert(METAMASK_MESSAGE.unavailable);
      }
    }
  }

  function getBalance() {
    (async () => {
      const tokenContract = getContract(Contracts.token);
      const balance = await tokenContract.balanceOf(address)
      setBalance(balance / Math.pow(10, 18));
    })()
  }

  return {
    address,
    connectWallet
  };
};

export default useMetaMask;
