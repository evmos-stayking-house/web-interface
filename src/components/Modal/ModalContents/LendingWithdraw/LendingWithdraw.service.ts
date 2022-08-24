import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import { useWalletState } from '../../../../contexts/WalletContext';

let vaultContract: Contract;
let tokenContract: Contract;

const useLendingWithdraw = (closeModal: VoidFunction) => {
  const { address } = useWalletState();

  const [amount, setAmount] = useState<string>('0.0');
  const [ibTokenBalance, setIbTokenBalance] = useState<string>('0.0');
  const [ibTokenWithdraw, setIbTokenWithdraw] = useState<string>('0.0');

  function setMaxAmount() {
    setAmount(ibTokenBalance);
  }

  async function withdraw() {
    console.log('출금량', convertDenomFrom(ibTokenWithdraw));
    const withdrawResult = await vaultContract.withdraw(convertDenomFrom(ibTokenWithdraw));
    if (withdrawResult && withdrawResult['hash']) {
      closeModal();
      alert(`txHash: ${withdrawResult['hash']} \n Please wait for transaction to confirm on the network...`);
    }
  }

  async function shareToAmount() {
    // if (Number(ibTokenWithdraw) > Number(ibTokenBalance)) return;
    const _amount = await vaultContract.shareToAmount(convertDenomFrom(ibTokenWithdraw));
    setAmount(convertUnitFrom(_amount));
  }

  async function getBalanceIbToken() {
    const _ibBalance = await vaultContract.balanceOf(address);
    setIbTokenBalance(convertUnitFrom(_ibBalance));
  }

  async function init() {
    await getBalanceIbToken();
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tATOM);
  }, []);

  useEffect(() => {
    (async (address) => {
      console.log(address);
      address && (await init());
    })(address);
  }, [address]);

  return {
    withdraw,
    setAmount,
    amount,
    setMaxAmount,
    shareToAmount,
    ibTokenBalance,
    setIbTokenWithdraw,
    ibTokenWithdraw
  };
};

export default useLendingWithdraw;
