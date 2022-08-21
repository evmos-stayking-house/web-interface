import { Contract } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';
import { convertDenomFrom, convertUnitFrom } from '../../../utils/numberFormats';
import { useEffect, useState } from 'react';
import { getContract } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { useModal } from '../../Modal';
import LendingDeposit from '../../Modal/ModalContents/LendingDeposit/LendingDeposit';
import { useWalletState } from '../../../contexts/WalletContext';
import LendingWithdraw from '../../Modal/ModalContents/LendingWithdraw/LendingWithdraw';

let vaultContract: Contract;
let tokenContract: Contract;

const useVault = () => {
  const { address } = useWalletState();
  const [ibTokenRatioWithToken, setIbTokenRatioWithToken] = useState<string>('1 ibATOM = 1.0000 ATOM');
  const [interestRate, setInterestRate] = useState<string>('0.0');
  const [totalSupply, setTotalSupply] = useState<string>('0');
  const [totalBorrowed, setTotalBorrowed] = useState<string>('0');
  const [utilizationRate, setUtilizationRate] = useState<string>('0');

  const [ibBalance, setIbBalance] = useState<string>('0');
  const [vaultTokenBalance, setVaultTokenBalance] = useState<string>('0');

  const {
    renderModal: renderDepositModal,
    openModal: openDepositModal,
    closeModal: closeDepositModal
  } = useModal({ content: <LendingDeposit title={'ATOM'} closeModal={() => {}} /> });

  const {
    renderModal: renderWithdrawModal,
    openModal: openWithdrawModal,
    closeModal: closeWithdrawModal
  } = useModal({ content: <LendingWithdraw title={'ATOM'} closeModal={() => {}} /> });

  async function shareToAmount(_share = '1') {
    const _amount: BigNumber = await vaultContract.shareToAmount(convertDenomFrom(_share));
    return convertUnitFrom(_amount.toString(), '18');
  }

  async function ibTokenRatioWithVaultToken() {
    const amount = await shareToAmount();
    setIbTokenRatioWithToken(`1 ibATOM = ${amount} ATOM`);
  }

  async function getInterestRate() {
    const _interestRate: BigNumber = await vaultContract.getInterestRate();
    const interestRate = convertUnitFrom(_interestRate.toString(), '0');
    setInterestRate(interestRate);
  }

  async function getTotalSupply() {
    const _totalAmount: BigNumber = await vaultContract.totalAmount();
    const totalAmount = convertUnitFrom(_totalAmount.toString(), '18');
    setTotalSupply(totalAmount);
  }

  async function getTotalBorrowed() {
    const _totalDebtAmount: BigNumber = await vaultContract.totalDebtAmount();
    const totalDebtAmount = convertUnitFrom(_totalDebtAmount.toString(), '18');
    setTotalBorrowed(totalDebtAmount);
  }

  async function getUtilizationRateBps() {
    const _utilizationRateBps = await vaultContract.utilizationRateBps();
    console.log(_utilizationRateBps);
    const utilizationRateBps = convertUnitFrom(_utilizationRateBps.toString(), '2');
    setUtilizationRate(utilizationRateBps);
  }

  async function getIbBalance() {
    if (!address) return;
    const _ibBalance: BigNumber = await vaultContract.balanceOf(address);
    const ibBalance = convertUnitFrom(_ibBalance.toString(), '18');
    const vaultToken = await shareToAmount(ibBalance);
    setIbBalance(ibBalance);
    setVaultTokenBalance(vaultToken);
  }

  async function init() {
    await ibTokenRatioWithVaultToken();
    await getInterestRate();
    await getTotalSupply();
    await getTotalBorrowed();
    await getUtilizationRateBps();
    await getIbBalance();
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tATOM);
  }, []);

  useEffect(() => {
    (async (_address) => {
      _address && (await init());
    })(address);
  }, [address]);

  return {
    ibTokenRatioWithToken,
    renderDepositModal,
    openDepositModal,
    closeDepositModal,
    renderWithdrawModal,
    openWithdrawModal,
    closeWithdrawModal,
    interestRate,
    totalSupply,
    totalBorrowed,
    utilizationRate,
    ibBalance,
    vaultTokenBalance
  };
};

export default useVault;
