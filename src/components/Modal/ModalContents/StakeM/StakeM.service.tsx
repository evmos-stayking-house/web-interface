import React, { SyntheticEvent, useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { contractsInfo } from '../../../../data/contract/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import { useWalletState } from '../../../../contexts/WalletContext';
import { useModal } from '../../useModal';
import StakeConfirm from './StakeConfirm/StakeConfirm';
import { useSnackbar } from 'notistack';

let tokenContract: Contract;
let vaultContract: Contract;
let stayKingContract: Contract;

const useStakeM = (closeModal: VoidFunction, parentLeverage: string | null) => {
  const { address, evmosBalance } = useWalletState();
  const [amount, setAmount] = useState<string>('0');
  const [borrowingAssetBalance, setBorrowingAssetBalance] = useState<string>('0');
  const [debtInToken, setDebtInToken] = useState<string>('0');
  const [deptInBase, setDebtInBase] = useState<string>('0');
  const [positionValue, setPositionValue] = useState<string>('0');
  const [borrowingAsset, setBorrowingAsset] = useState<any>('USDC');
  const [leverage, setLeverage] = useState<string | null>(parentLeverage);
  const { onChangeIsPendingState } = useWalletState();
  const { enqueueSnackbar } = useSnackbar();

  const {
    renderModal: renderStakeConfirmModal,
    openModal: openStakeConfirmModal,
    closeModal: closeStakeConfirmModal
  } = useModal({
    content: <StakeConfirm closeModal={() => closeStakeConfirmModal()} onPropConfirm={() => addPosition()} />
  });

  function setMaxAmount() {
    setAmount(evmosBalance);
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

  function onChangeBorrowingAsset(e: SyntheticEvent<any>) {
    const tokenName = e.currentTarget.innerText!;
    if (!(tokenName === 'USDC')) {
      alert('the selected asset will be supported soon');
      setBorrowingAsset('USDC');
    }
    setBorrowingAsset(tokenName);
  }

  async function loadLendingPoolAsset() {
    const _balance = await tokenContract.balanceOf(contractsInfo[Contracts.vault].address);
    setBorrowingAssetBalance(convertUnitFrom(_balance, 18));
  }

  async function onChangeDebtInToken(_deptInBase: string) {
    const _deptInToken = await vaultContract.getTokenIn(_deptInBase);
    setDebtInToken(convertUnitFrom(_deptInToken, 0));
  }

  function stake() {
    openStakeConfirmModal();
  }

  async function addPosition() {
    onChangeIsPendingState(true);
    try {
      const result = await stayKingContract.addPosition(
        contractsInfo[Contracts.tUSDC].address,
        convertDenomFrom(amount),
        convertDenomFrom(deptInBase),
        {
          value: convertDenomFrom(amount)
        }
      );
      closeModal();
      enqueueSnackbar(`Transaction Hash: ${result['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar(e.toString(), { variant: 'error' });
    }
  }

  function registerContractEvents() {
    stayKingContract.on('AddPosition', async (...args) => {
      onChangeIsPendingState(false);
    });
  }

  async function init() {
    await loadLendingPoolAsset();
    registerContractEvents();
  }

  useEffect(() => {
    tokenContract = getContract(Contracts.tUSDC);
    vaultContract = getContract(Contracts.vault);
    stayKingContract = getContract(Contracts.stayKing);

    (async (_address) => {
      _address && (await init());
    })(address);
  }, [address]);

  return {
    evmosBalance,
    deptInBase,
    positionValue,
    setAmount,
    amount,
    stake,
    setMaxAmount,
    borrowingAssetBalance,
    onChangeBorrowingAsset,
    borrowingAsset,
    debtInToken,
    leverage,
    onChangeLeverage,
    onChangeSuppliedAmount,
    addPosition,
    renderStakeConfirmModal
  };
};

export default useStakeM;
