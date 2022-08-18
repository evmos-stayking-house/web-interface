import { useEffect, useState } from 'react';
import { getContract } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { bigNumToNum, bigNumToStr } from '../../../utils/numberFormats';

const useDashboard = (address: string) => {
  const [balance, setBalance] = useState<number>(0);
  const [ibAtom, setIbAtom] = useState<string>('0.0');
  const [interestRate, setInterestRate] = useState<number>(0);

  async function getIbAtom() {
    if(address) {
      const balOfIbAtom = await getContract(Contracts.vault).balanceOf(address);
      setIbAtom(bigNumToStr(balOfIbAtom));
    }
  }

  async function getInterestRate() {
    const interestRate = await getContract(Contracts.vault).getInterestRate();
    setInterestRate(bigNumToNum(interestRate));
  }

  useEffect(() => {
    (async () => {
      await getIbAtom();
      await getInterestRate();
    })();
  }, [address]);

  return {
    balance,
    setBalance,
    address,
    ibAtom,
    interestRate
  }
};

export default useDashboard;
