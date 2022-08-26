import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import useLendingAsset from '../../../../hooks/useLendingAsset';
import { contractsInfo } from '../../../../data/contract/contracts';
import { useWalletState } from '../../../../contexts/WalletContext';
import { useSnackbar } from 'notistack';
import { sleep } from '../../../../utils/utils';

let vaultContract: Contract;
let tokenContract: Contract;

const useLendingDeposit = (closeModal: VoidFunction) => {
  const { onChangeIsPendingState } = useWalletState();
  const [amount, setAmount] = useState<string>('0');
  const [share, setShare] = useState<string>('0');
  const { tokenBalance } = useLendingAsset(Contracts.tUSDC);
  const { enqueueSnackbar } = useSnackbar();

  function setMaxAmount() {
    setAmount(tokenBalance);
  }

  async function deposit() {
    onChangeIsPendingState(true);
    try {
      const approveResult = await tokenContract.approve(
        contractsInfo[Contracts.vault].address,
        convertDenomFrom(amount)
      );
      approveResult.wait();
      const depositedResult = await vaultContract.deposit(convertDenomFrom(amount));
      closeModal();
      enqueueSnackbar(`Transaction Hash: ${depositedResult['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar(e.toString(), { variant: 'error' });
    }
  }

  async function amountToShare() {
    const _share = await vaultContract.amountToShare(convertDenomFrom(amount));
    setShare(convertUnitFrom(_share));
  }

  async function registerContractEvents() {
    vaultContract.on('Deposit', async (...args) => {
      onChangeIsPendingState(false);
    });
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tUSDC);

    (async () => {
      await registerContractEvents();
    })();
  }, []);

  return {
    deposit,
    setAmount,
    amount,
    tokenBalance,
    setMaxAmount,
    share,
    amountToShare
  };
};

export default useLendingDeposit;
