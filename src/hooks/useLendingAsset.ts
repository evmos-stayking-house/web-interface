import React, { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import { getContract } from '../config/contract';
import { Contracts } from '../type/contract';
import { useWalletState } from '../contexts/WalletContext';
import { bigNumToStr, convertUnitFrom } from '../utils/numberFormats';

let contract: Contract;

const useLendingAsset = (contractKey: Contracts) => {
  const { address } = useWalletState();
  const [tokenBalance, setTokenBalance] = useState<string>('0.0');

  async function balanceOf() {
    const balance = await contract.balanceOf(address);
    setTokenBalance(convertUnitFrom(balance, '18'));
  }

  async function init() {
    await balanceOf();
  }

  useEffect(() => {
    contract = getContract(contractKey);
    (async (address) => {
      address && (await init());
    })(address);
  }, [address]);

  return {
    tokenName: contractKey,
    tokenBalance
  };
};

export default useLendingAsset;
