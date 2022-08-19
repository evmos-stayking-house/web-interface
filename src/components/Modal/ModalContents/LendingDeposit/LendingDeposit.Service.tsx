import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import useLendingAsset from '../../../../hooks/useLendingAsset';

let contract: Contract;

const useLendingDeposit = () => {
  const [amount, setAmount] = useState<string>('');
  const [share, setShare] = useState<string>('');
  const { tokenBalance, tokenName } = useLendingAsset(Contracts.tATOM);

  function setMaxAmount() {
    setAmount(tokenBalance);
  }

  async function deposit() {
    console.log('입금량', convertDenomFrom(amount));
    const result = await contract.deposit(convertDenomFrom(amount));
    console.log(result);
  }

  async function amountToShare() {
    const _share = await contract.amountToShare(convertDenomFrom(amount));
    setShare(convertUnitFrom(_share));
  }

  useEffect(() => {
    contract = getContract(Contracts.vault);
  }, []);


  return {
    deposit,
    setAmount,
    amount,
    tokenBalance,
    setMaxAmount,
    share,
    amountToShare
  }

}

export default useLendingDeposit;
