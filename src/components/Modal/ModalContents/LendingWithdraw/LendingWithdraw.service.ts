import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import { useWalletState } from '../../../../contexts/WalletContext';
import { useSnackbar } from 'notistack';

let vaultContract: Contract;
let tokenContract: Contract;

const useLendingWithdraw = (closeModal: VoidFunction) => {
  const { address } = useWalletState();
  const { onChangeIsPendingState } = useWalletState();
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState<string>('0');
  const [ibTokenBalance, setIbTokenBalance] = useState<string>('0');
  const [ibTokenWithdraw, setIbTokenWithdraw] = useState<string>('0');

  function setMaxAmount() {
    setAmount(ibTokenBalance);
  }

  async function withdraw() {
    onChangeIsPendingState(true);
    try {
      const withdrawResult = await vaultContract.withdraw(convertDenomFrom(ibTokenWithdraw));
      closeModal();
      enqueueSnackbar(`Transaction Hash: ${withdrawResult['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar(e.toString(), { variant: 'error' });
    }
  }

  async function shareToAmount() {
    const _amount = await vaultContract.shareToAmount(convertDenomFrom(ibTokenWithdraw));
    setAmount(convertUnitFrom(_amount));
  }

  async function getBalanceIbToken() {
    const _ibBalance = await vaultContract.balanceOf(address);
    setIbTokenBalance(convertUnitFrom(_ibBalance));
  }

  async function init() {
    await getBalanceIbToken();
    registerContractEvents();
  }

  function registerContractEvents() {
    vaultContract.on('Withdraw', async (...args) => {
      onChangeIsPendingState(false);
    });
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tUSDC);
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
