import { useEffect, useState } from 'react';
import { getContract } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { bigNumToNum, convertDenomFrom, convertUnitFrom } from '../../../utils/numberFormats';
import { Contract } from 'ethers';
import useCoinPrice from '../../../hooks/useCoinPrice';
import { contractsInfo } from '../../../data/contract/contracts';

let vaultContract: Contract;
let stayKingContract: Contract;

const useDashboard = (address: string) => {
  const [balance, setBalance] = useState<number>(0);
  const [ibToken, setIbToken] = useState<string>('0');
  const [tokenAmount, setTokenAmount] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tvl, setTvl] = useState<string>('0');
  const { coinPrice: tokenPrice } = useCoinPrice('cosmos');
  const { coinPrice: evmosPrice } = useCoinPrice('evmos');

  async function getIbToken() {
    try {
      const balOfIbToken = await vaultContract.balanceOf(address);
      setIbToken(convertUnitFrom(balOfIbToken, 18));
      await shareToAmount(convertUnitFrom(balOfIbToken, 18));
    } catch (e) {
      setIbToken('0');
    }
  }

  async function shareToAmount(_share: string) {
    const _amount = await vaultContract.shareToAmount(convertDenomFrom(_share));
    setTokenAmount(convertUnitFrom(_amount));
  }

  async function getInterestRate() {
    try {
      const interestRate = await vaultContract.getInterestRate();
      setInterestRate(bigNumToNum(interestRate));
    } catch (e) {
      setInterestRate(0);
    }
  }

  async function calculatedTVL() {
    const _totalAmount = await getTotalAmountFromStayKing();
    const totalAmountOfEvmos = convertUnitFrom(_totalAmount, '18');
    const _balanceOf = await balanceOf();
    const totalBalanceOfToken = convertUnitFrom(_balanceOf, '18');

    const tvlOfEVMOS = Number(totalAmountOfEvmos) * (evmosPrice ?? 0);
    const tvlOfToken = Number(totalBalanceOfToken) * (tokenPrice ?? 0);

    setTvl((tvlOfToken + tvlOfEVMOS).toFixed(0));
  }

  async function balanceOf() {
    return getContract(Contracts.tUSDC).balanceOf(contractsInfo[Contracts.vault].address);
  }

  function getTotalAmountFromStayKing() {
    return stayKingContract.totalAmount();
  }

  async function init() {
    await getIbToken();
    await getInterestRate();
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    stayKingContract = getContract(Contracts.stayKing);
  }, []);

  useEffect(() => {
    (async (address) => {
      if (!address) return;
      await init();
    })(address);
  }, [address]);

  useEffect(() => {
    (async () => {
      await calculatedTVL();
    })();
  }, [evmosPrice, tokenPrice]);

  return {
    tvl,
    balance,
    setBalance,
    address,
    ibToken,
    interestRate,
    tokenAmount
  };
};

export default useDashboard;