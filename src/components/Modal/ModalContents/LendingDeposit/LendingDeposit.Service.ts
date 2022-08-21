import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import useLendingAsset from '../../../../hooks/useLendingAsset';
import { contractsInfo } from '../../../../data/contract/contracts';

let vaultContract: Contract;
let tokenContract: Contract;

const useLendingDeposit = (closeModal: VoidFunction) => {
  const [amount, setAmount] = useState<string>('');
  const [share, setShare] = useState<string>('');
  const { tokenBalance, tokenName } = useLendingAsset(Contracts.tATOM);

  function setMaxAmount() {
    setAmount(tokenBalance);
  }

  async function deposit() {
    console.log('입금량', convertDenomFrom(amount));
    const approvedResult = await tokenContract.approve(
      contractsInfo[Contracts.vault].address,
      convertDenomFrom(amount)
    );
    console.log(approvedResult);
    const depositedResult = await vaultContract.deposit(convertDenomFrom(amount));
    console.log(depositedResult);
    if (depositedResult && depositedResult['hash']) {
      closeModal();
      alert(`txHash: ${depositedResult['hash']} \n Please wait for transaction to confirm on the network...`);
    }
  }

  async function amountToShare() {
    const _share = await vaultContract.amountToShare(convertDenomFrom(amount));
    setShare(convertUnitFrom(_share));
  }

  async function init() {}

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tATOM);

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
