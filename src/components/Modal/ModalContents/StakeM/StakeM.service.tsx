import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from '@ethersproject/contracts';
import { contractsInfo } from '../../../../data/contract/contracts';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';
import { useWalletState } from '../../../../contexts/WalletContext';
import { useModal } from '../../useModal';
import StakeConfirm from './StakeConfirm/StakeConfirm';
import { useSnackbar } from 'notistack';
import { BigNumber } from 'ethers';
import { calculateAPYFromAPR, goTxConfirm } from '../../../../utils/utils';

let tokenContract: Contract;
let vaultContract: Contract;
let stayKingContract: Contract;

export interface YieldStaking {
  apr: string;
  apy: string;
  borrowingInterest: string;
  totalApr: string;
}

const useStakeM = (closeModal: VoidFunction, parentLeverage: string | null, _yieldStaking: YieldStaking) => {
  const { address, evmosBalance } = useWalletState();
  const [amount, setAmount] = useState<string>('0');
  const [borrowingAssetBalance, setBorrowingAssetBalance] = useState<string>('0');
  const [debtInToken, setDebtInToken] = useState<string>('0');
  const [deptInBase, setDebtInBase] = useState<string>('0');
  const [positionValue, setPositionValue] = useState<string>('0');
  const [borrowingAsset, setBorrowingAsset] = useState<any>('USDC');
  const [leverage, setLeverage] = useState<string | null>(parentLeverage);
  const { onChangeIsPendingState } = useWalletState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [yieldStaking, setYieldStaking] = useState<YieldStaking>(_yieldStaking);

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

  async function onChangeAmount(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    event.preventDefault();
    if (isNaN(Number(event.currentTarget.value))) return;
    if (Number(event.currentTarget.value) > Number(evmosBalance)) return setAmount(evmosBalance);
    if (Number(event.currentTarget.value) < 0) return setAmount('0');
    setAmount(String(Number(event.currentTarget.value)));
  }

  async function getInterestFromVault() {
    const _lastAnnualRateBps: BigNumber = await vaultContract.lastAnnualRateBps();
    const _reservedBps: BigNumber = await stayKingContract.reservedBps();
    return (
      Number(convertUnitFrom(_lastAnnualRateBps.toString(), '4')) +
      Number(convertUnitFrom(_reservedBps.toString(), '4'))
    );
  }

  async function loadYieldStaking(_leverage?: any) {
    const _result = await getStakingAPR();
    const _apr = Number(_result.data.apr) - 15;
    const lev = _leverage ? Number(_leverage) : 1;
    const _borrowingInterest = await getInterestFromVault();
    const borrowingInterest = Number(_borrowingInterest) * (lev - 1);
    const apr = _apr * lev;
    const totalApr = _apr * lev - borrowingInterest;
    const totalApy = calculateAPYFromAPR((totalApr / 100).toFixed(2));

    setYieldStaking({
      ...yieldStaking,
      apy: totalApy.toFixed(2),
      apr: apr.toFixed(2),
      borrowingInterest: borrowingInterest.toFixed(2),
      totalApr: totalApr.toFixed(2)
    });
  }

  async function getStakingAPR() {
    return fetch(`/api/yield/evmos`).then((res) => res.json());
  }

  async function onChangeSuppliedAmount() {
    const deptInBase = (Number(leverage) - 1) * Number(amount);
    setDebtInBase(String(deptInBase));
    await onChangeDebtInToken(String(deptInBase));
    setPositionValue(String(Number(amount) + deptInBase));
  }

  async function onChangeLeverage(_leverage: string | null) {
    const deptInBase = (Number(_leverage) - 1) * Number(amount);
    setDebtInBase(String(deptInBase));
    await onChangeDebtInToken(String(deptInBase));
    setPositionValue(String(Number(amount) + deptInBase));
    setLeverage(_leverage);
    await loadYieldStaking(_leverage);
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
    const _deptInToken = await vaultContract.getTokenIn(convertDenomFrom(_deptInBase));
    setDebtInToken(convertUnitFrom(_deptInToken, 18));
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
      const key = enqueueSnackbar(`[Your Asset Staked Successfully] Transaction Hash: ${result['hash']}`, {
        variant: 'success',
        onClick: () => {
          goTxConfirm(result['hash']);
          closeSnackbar(key);
        }
      });
    } catch (e: any) {
      onChangeIsPendingState(false);
      const key = enqueueSnackbar('[Your Asset Staked Failed] ' + e.toString(), {
        variant: 'warning',
        onClick: () => closeSnackbar(key)
      });
    } finally {
      setTimeout(() => onChangeIsPendingState(false), 15000);
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
    renderStakeConfirmModal,
    yieldStaking,
    onChangeAmount
  };
};

export default useStakeM;
