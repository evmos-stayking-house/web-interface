import { ChangeEvent, useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import useLendingAsset from '../../../../hooks/useLendingAsset';
import { contractsInfo } from '../../../../data/contract/contracts';
import { useWalletState } from '../../../../contexts/WalletContext';
import { useSnackbar } from 'notistack';
import { goTxConfirm } from '../../../../utils/utils';

export enum DepositTxStatus {
  NotYet = 'NotYet',
  Approved = 'Approved'
}

let vaultContract: Contract;
let tokenContract: Contract;

const useLendingDeposit = (closeModal: VoidFunction) => {
  const [amount, setAmount] = useState<string>('0');
  const [share, setShare] = useState<string>('0');
  const [txStatus, setTxStatus] = useState<DepositTxStatus>(DepositTxStatus.NotYet);

  const { onChangeIsPendingState } = useWalletState();
  const { tokenBalance } = useLendingAsset(Contracts.tUSDC);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function onChangeAmount(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    if (isNaN(Number(event.currentTarget.value))) return;
    if (Number(event.currentTarget.value) > Number(tokenBalance)) return setAmount(tokenBalance);
    if (Number(event.currentTarget.value) < 0) return setAmount('0');
    setAmount(String(Number(event.currentTarget.value)));
  }

  function setMaxAmount() {
    setAmount(tokenBalance);
  }

  async function approve() {
    onChangeIsPendingState(true);
    try {
      const approveResult = await tokenContract.approve(
        contractsInfo[Contracts.vault].address,
        convertDenomFrom(amount)
      );
      setTxStatus(DepositTxStatus.Approved);
      const key = enqueueSnackbar(`[Approved Successful] Transaction Hash: ${approveResult['hash']}`, {
        variant: 'success',
        onClick: () => {
          goTxConfirm(approveResult['hash']);
          closeSnackbar(key);
        }
      });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar('[Approved Failed] ' + e.toString(), { variant: 'error' });
    } finally {
      setTimeout(() => onChangeIsPendingState(false), 15000);
    }
  }

  async function deposit() {
    onChangeIsPendingState(true);
    try {
      const depositedResult = await vaultContract.deposit(convertDenomFrom(amount));
      closeModal();
      const key = enqueueSnackbar(`[Deposit Successful] Transaction Hash: ${depositedResult['hash']}`, {
        variant: 'success',
        onClick: () => {
          goTxConfirm(depositedResult['hash']);
          closeSnackbar(key);
        }
      });
    } catch (e: any) {
      onChangeIsPendingState(false);
      const key = enqueueSnackbar('[Deposit Failed] ' + e.toString(), {
        variant: 'warning',
        onClick: () => closeSnackbar(key)
      });
    } finally {
      setTimeout(() => onChangeIsPendingState(false), 15000);
    }
  }

  async function amountToShare() {
    const _share = await vaultContract.amountToShare(convertDenomFrom(amount));
    setShare(String(Number(convertUnitFrom(_share))));
  }

  function registerContractEvents() {
    tokenContract.on('Approval', async (...args) => {
      onChangeIsPendingState(false);
    });

    vaultContract.on('Deposit', async (...args) => {
      onChangeIsPendingState(false);
    });
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tUSDC);
    registerContractEvents();
  }, []);

  return {
    deposit,
    approve,
    onChangeAmount,
    amount,
    tokenBalance,
    setMaxAmount,
    share,
    amountToShare,
    txStatus
  };
};

export default useLendingDeposit;
