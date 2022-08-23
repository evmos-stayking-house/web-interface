import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { getValueFromSet } from '../../../../utils/utils';
import { contractsInfo } from '../../../../data/contract/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import { useWalletState } from '../../../../contexts/WalletContext';

let tokenContract: Contract;
let vaultContract: Contract;
let stayKingContract: Contract;

const useStakeM = (closeModal: VoidFunction, parentLeverage: string | null) => {
  const { evmosBalance } = useWalletState();
  const [amount, setAmount] = useState<string>('');
  const [borrowingAssetBalance, setBorrowingAssetBalance] = useState<string>('0.0');
  const [deptInToken, setDebtInToken] = useState<string>('0');
  const [deptInBase, setDebtInBase] = useState<string>('0.0');
  const [positionValue, setPositionValue] = useState<string>('0.0');
  const [borrowingAsset, setBorrowingAsset] = useState<any>('ATOM');
  const [leverage, setLeverage] = useState<string | null>(parentLeverage);

  function setMaxAmount() {
    setAmount(evmosBalance);
  }

  // temporary function...
  async function swapHelperBalanceCheck() {
    const tAtomBalance = await tokenContract.balanceOf('0x68B1D87F95878fE05B998F19b66F4baba5De1aed');
    console.log('swapHelper tAtom balanceOf', convertUnitFrom(tAtomBalance, '18'));
  }

  async function onChangeSuppliedAmount() {
    const deptInBase = (Number(leverage) - 1) * Number(amount);
    setDebtInBase(deptInBase.toFixed(1));
    await onChangeDebtInToken(deptInBase.toFixed(0));
    setPositionValue((Number(amount) + deptInBase).toFixed(1));
  }

  async function onChangeLeverage(_leverage: string | null) {
    const deptInBase = (Number(_leverage) - 1) * Number(amount);
    setDebtInBase(deptInBase.toFixed(1));
    await onChangeDebtInToken(deptInBase.toFixed(0));
    setPositionValue((Number(amount) + deptInBase).toFixed(1));
    setLeverage(_leverage);
  }

  function onChangeBorrowingAsset(e: any) {
    const tokenName = getValueFromSet(e);
    if (!(tokenName === 'ATOM')) {
      alert('the selected asset will be supported soon');
      setBorrowingAsset('ATOM');
    }
    setBorrowingAsset(getValueFromSet(e));
  }

  async function loadLendingPoolAsset() {
    const _balance = await tokenContract.balanceOf(contractsInfo[Contracts.vault].address);
    setBorrowingAssetBalance(convertUnitFrom(_balance, 18));
  }

  async function onChangeDebtInToken(_deptInBase: string) {
    const _deptInToken = await vaultContract.getTokenIn(_deptInBase);
    setDebtInToken(convertUnitFrom(_deptInToken, 0));
  }

  async function addPosition() {
    const result = await stayKingContract.addPosition(
      contractsInfo[Contracts.tATOM].address,
      convertDenomFrom(amount),
      convertDenomFrom(deptInBase),
      {
        value: convertDenomFrom(amount)
      }
    );
    if (result && result['hash']) {
      closeModal();
      alert(`txHash: ${result['hash']} \n Please wait for transaction to confirm on the network...`);
    }
  }

  async function init() {
    await loadLendingPoolAsset();
    await swapHelperBalanceCheck();
  }

  useEffect(() => {
    tokenContract = getContract(Contracts.tATOM);
    vaultContract = getContract(Contracts.vault);
    stayKingContract = getContract(Contracts.stayKing);

    (async () => {
      await init();
    })();
  }, []);

  return {
    evmosBalance,
    deptInBase,
    positionValue,
    setAmount,
    amount,
    setMaxAmount,
    borrowingAssetBalance,
    onChangeBorrowingAsset,
    borrowingAsset,
    deptInToken,
    leverage,
    onChangeLeverage,
    onChangeSuppliedAmount,
    addPosition
  };
};

export default useStakeM;
