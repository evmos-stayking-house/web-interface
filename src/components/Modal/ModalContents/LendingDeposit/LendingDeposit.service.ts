import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import useLendingAsset from '../../../../hooks/useLendingAsset';
import { contractsInfo } from '../../../../data/contract/contracts';
import { useWalletState } from '../../../../contexts/WalletContext';
import { useSnackbar } from 'notistack';

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
      enqueueSnackbar(`Transaction Hash: ${approveResult['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar(e.toString(), { variant: 'error' });
    }
  }

  async function deposit() {
    onChangeIsPendingState(true);
    try {
      const depositedResult = await vaultContract.deposit(convertDenomFrom(amount));
      closeModal();
      enqueueSnackbar(`Transaction Hash: ${depositedResult['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      const key = enqueueSnackbar(e.toString(), {
        variant: 'warning',
        onClick: () => closeSnackbar(key)
      });
    }
  }

  async function amountToShare() {
    const _share = await vaultContract.amountToShare(convertDenomFrom(amount));
    setShare(Number(convertUnitFrom(_share)).toFixed(1));
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
    setAmount,
    amount,
    tokenBalance,
    setMaxAmount,
    share,
    amountToShare,
    txStatus
  };
};

export default useLendingDeposit;
