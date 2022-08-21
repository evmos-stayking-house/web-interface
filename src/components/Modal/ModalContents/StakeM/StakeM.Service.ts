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

const useStakeM = (closeModal: VoidFunction) => {
  const { evmosBalance } = useWalletState();
  const [amount, setAmount] = useState<string>('');
  const [borrowingAssetBalance, setBorrowingAssetBalance] = useState<string>('0.0');
  const [deptInToken, setDeptInToken] = useState<string>('0');
  const [deptInBase, setDeptInBase] = useState<string>('0.0');
  const [positionValue, setPositionValue] = useState<string>('0.0');
  const [borrowingAsset, setBorrowingAsset] = useState<any>('ATOM');
  const [leverage, setLeverage] = useState<any>('1.0');

  function setMaxAmount() {
    setAmount(evmosBalance);
  }

  async function onChangeSuppliedAmount() {
    setDeptInBase((Number(leverage) * Number(amount)).toFixed(1));
    await onChangeDeptInToken((Number(leverage) * Number(amount)).toFixed(0));
    setPositionValue((Number(amount) + Number(leverage) * Number(amount)).toFixed(1));
  }

  async function onChangeLeverage(e: any) {
    const _leverage = getValueFromSet(e);
    setDeptInBase((Number(_leverage) * Number(amount)).toFixed(1));
    await onChangeDeptInToken((Number(_leverage) * Number(amount)).toFixed(0));
    setPositionValue((Number(amount) + Number(_leverage) * Number(amount)).toFixed(1));

    setLeverage(getValueFromSet(e));
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

  async function onChangeDeptInToken(_deptInBase: string) {
    const _deptInToken = await vaultContract.getTokenIn(_deptInBase);
    setDeptInToken(convertUnitFrom(_deptInToken, 0));
  }

  async function addPosition() {
    console.log('스테이크량', convertDenomFrom(positionValue));
    const result = await stayKingContract.addPosition(
      contractsInfo[Contracts.tATOM].address,
      convertDenomFrom(amount),
      convertDenomFrom(deptInBase)
    );
    if (result && result['hash']) {
      closeModal();
      alert(`txHash: ${result['hash']} \n Please wait for transaction to confirm on the network...`);
    }
  }

  async function init() {
    await loadLendingPoolAsset();
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
    borrowingAsset,
    onChangeBorrowingAsset,
    deptInToken,
    leverage,
    onChangeLeverage,
    onChangeSuppliedAmount,
    addPosition
  };
};

export default useStakeM;
