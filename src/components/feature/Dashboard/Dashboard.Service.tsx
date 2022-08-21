import { useEffect, useState } from 'react';
import { getContract } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { bigNumToNum, bigNumToStr, convertUnitFrom } from '../../../utils/numberFormats';

const useDashboard = (address: string) => {
  const [balance, setBalance] = useState<number>(0);
  const [ibAtom, setIbAtom] = useState<string>('0.0');
  const [interestRate, setInterestRate] = useState<number>(0);

  async function getIbAtom() {
    try {
      const balOfIbAtom = await getContract(Contracts.vault).balanceOf(address);
      setIbAtom(convertUnitFrom(balOfIbAtom, 18));
    } catch (e) {
      setIbAtom('0');
    }
  }

  async function getInterestRate() {
    try {
      const interestRate = await getContract(Contracts.vault).getInterestRate();
      setInterestRate(bigNumToNum(interestRate));
    } catch (e) {
      setInterestRate(0);
    }
  }

  useEffect(() => {
    (async (address) => {
      if (!address) return;
      await getIbAtom();
      await getInterestRate();
    })(address);
  }, [address]);

  return {
    balance,
    setBalance,
    address,
    ibAtom,
    interestRate
  };
};

export default useDashboard;
