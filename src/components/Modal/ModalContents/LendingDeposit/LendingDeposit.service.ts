import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import useLendingAsset from '../../../../hooks/useLendingAsset';
import { contractsInfo } from '../../../../data/contract/contracts';
import { useWalletState } from '../../../../contexts/WalletContext';

let vaultContract: Contract;
let tokenContract: Contract;

const useLendingDeposit = (closeModal: (txHash: string) => void) => {
  const { onChangeIsPendingState } = useWalletState();
  const [amount, setAmount] = useState<string>('0');
  const [share, setShare] = useState<string>('0');
  const { tokenBalance } = useLendingAsset(Contracts.tUSDC);

  function setMaxAmount() {
    setAmount(tokenBalance);
  }

  async function deposit() {
    onChangeIsPendingState(true);
    try {
      await tokenContract.approve(contractsInfo[Contracts.vault].address, convertDenomFrom(amount));
      const depositedResult = await vaultContract.deposit(convertDenomFrom(amount));
      closeModal(depositedResult['hash']);
    } catch (e) {
      console.log(`ERROR: `, e);
      onChangeIsPendingState(false);
    }
  }

  async function amountToShare() {
    const _share = await vaultContract.amountToShare(convertDenomFrom(amount));
    setShare(convertUnitFrom(_share));
  }

  async function init() {
    vaultContract.on('Deposit', (...args) => {
      onChangeIsPendingState(false);
    });
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tUSDC);

    (async () => {
      await init();
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
