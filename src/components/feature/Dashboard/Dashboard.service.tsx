import { useEffect, useState } from 'react';
import { getContract, getProvider } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { bigNumToNum, convertDenomFrom, convertUnitFrom } from '../../../utils/numberFormats';
import { Contract, ethers } from 'ethers';
import useCoinPrice from '../../../hooks/useCoinPrice';
import { contractsInfo } from '../../../data/contract/contracts';
import { useWalletState } from '../../../contexts/WalletContext';

export enum PositionTab {
  Active = 'Active',
  Liquidated = 'Liquidated'
}

export enum BalanceTab {
  Balance = 'Balance',
  Locked = 'Locked',
  Unlockable = 'Unlockable'
}

let vaultContract: Contract;
let stayKingContract: Contract;
let uEVMOSContract: Contract;

const useDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<PositionTab>(PositionTab.Active);
  const [selectedBalanceTab, setSelectedBalanceTab] = useState<BalanceTab>(BalanceTab.Balance);
  const [balance, setBalance] = useState<number>(0);
  const [ibToken, setIbToken] = useState<string>('0');
  const [tokenAmount, setTokenAmount] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tvl, setTvl] = useState<string>('0');
  const [evmosBalance, setEvmosBalance] = useState<string>('0');
  const { address } = useWalletState();
  const { coinPrice: tokenPrice } = useCoinPrice('cosmos');
  const { coinPrice: evmosPrice } = useCoinPrice('evmos');

  async function onSelectedBalanceTab(tab: BalanceTab) {
    let _evmosBalance: string = '0';

    if (tab === BalanceTab.Balance) {
      const _balance = await getBalance();
      _evmosBalance = ethers.utils.formatEther(_balance);
    } else if (tab === BalanceTab.Locked) {
      _evmosBalance = await balanceOfLocked();
    } else if (tab === BalanceTab.Unlockable) {
      const _balance = await getUnlockable();
      try {
        _evmosBalance = ethers.utils.formatEther(_balance);
      } catch (e) {
        _evmosBalance = '0';
      }
    }
    setEvmosBalance(_evmosBalance);
    setSelectedBalanceTab(tab);
  }

  function getBalance() {
    return getProvider().getBalance(address);
  }

  async function balanceOfLocked() {
    const _balance = await uEVMOSContract.balanceOf(address);
    const _amount = await uEVMOSContract.shareToAmount(Number(convertUnitFrom(_balance, '18')).toFixed(0));
    return convertUnitFrom(_amount, '0');
  }

  function getUnlockable() {
    return uEVMOSContract.getUnlockable(address);
  }

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
    await onSelectedBalanceTab(BalanceTab.Balance);
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    stayKingContract = getContract(Contracts.stayKing);
    uEVMOSContract = getContract(Contracts.uEVMOS);
  }, []);

  useEffect(() => {
    (async (address) => {
      if (!address) return;
      await init();
    })(address);
  }, [address]);

  useEffect(() => {
    (async (address) => {
      address && (await calculatedTVL());
    })(address);
  }, [evmosPrice, tokenPrice]);

  return {
    tvl,
    balance,
    setBalance,
    address,
    ibToken,
    interestRate,
    tokenAmount,
    evmosBalance,
    evmosPrice,
    selectedTab,
    setSelectedTab,
    selectedBalanceTab,
    onSelectedBalanceTab
  };
};

export default useDashboard;
