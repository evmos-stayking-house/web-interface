import React, { useEffect, useState } from 'react';
import { useWalletState } from '../../../../../contexts/WalletContext';
import { contractsInfo } from '../../../../../data/contract/contracts';
import { Contracts } from '../../../../../type/contract';
import { convertDenomFrom, convertUnitFrom } from '../../../../../utils/numberFormats';
import { Position } from '../../../../feature/Dashboard/ActivePosition/ActivePosition.service';
import { BigNumber, Contract } from 'ethers';
import { getContract } from '../../../../../config/contract';
import { useSnackbar } from 'notistack';
import { calculateAPYFromAPR } from '../../../../../utils/utils';

let stayKingContract: Contract;
let vaultContract: Contract;
let tokenContract: Contract;

export enum PositionType {
  ADD = 'Add',
  REMOVE = 'Remove'
}

export enum RepayType {
  EQUITY = 'Equity',
  DEBT = 'Debt'
}

interface RepayAmount {
  amountInBase?: number;
  amountInToken?: number;
}

interface YieldStaking {
  apr: string;
  apy: string;
  borrowingInterest: string;
  totalApr: string;
}

/**
 *  position value: positionValueInBase
 *  equity value: positionValueInBase - debtInBase
 *  debt value: debtInBase
 *  debt ratio: debtInBase / positionValueInBase * 100(%)
 *  kill factor: killFactorBps / 100
 *  safety buffer: (kill factor) - (debt ratio)
 */
const useAdjust = (closeModal: VoidFunction) => {
  const { evmosBalance, address } = useWalletState();
  const [leverage, setLeverage] = useState<string | null>('1.0');
  const [max, setMax] = useState<string>(evmosBalance);
  const [amount, setAmount] = useState<string>('0');
  const [borrowingAssetBalance, setBorrowingAssetBalance] = useState<string>('0.0');
  const [position, setPosition] = useState<Position | null>(null);
  const [updatedPosition, setUpdatedPosition] = useState<Position | null>();
  const [positionValue, setPositionValue] = useState<string>('0.0');
  const [debtInToken, setDebtInToken] = useState<string>('0');
  const [debtInBase, setDebtInBase] = useState<string>('0');
  const [repayType, setRepayType] = useState<RepayType | null>(null);
  const [repayAmount, setRepayAmount] = useState<RepayAmount>({ amountInBase: 0, amountInToken: 0 });

  const [equityPositionType, setEquityPositionType] = React.useState<PositionType>(PositionType.ADD);
  const [debtPositionType, setDebtPositionType] = React.useState<PositionType>(PositionType.ADD);
  const [yieldStaking, setYieldStaking] = useState<YieldStaking>({
    apr: '0',
    apy: '0',
    totalApr: '0',
    borrowingInterest: '0'
  });

  const [noticePopupOpen, setNoticePopupOpen] = useState<boolean>(false);

  const { onChangeIsPendingState } = useWalletState();
  const { enqueueSnackbar } = useSnackbar();

  const handleNoticePopup = (open: boolean) => setNoticePopupOpen(open);

  const handleChangeEquityType = async (event: React.MouseEvent<HTMLElement>, type: PositionType) => {
    event.preventDefault();
    if (!type) {
      setEquityPositionType(equityPositionType);
    } else {
      setEquityPositionType(type);
      await onChangeAmount('0');
      setDebtInToken('0');
      setRepayAmount({ amountInBase: 0, amountInToken: 0 });
    }
  };

  const handleChangeDebtType = async (event: React.MouseEvent<HTMLElement>, type: PositionType) => {
    event.preventDefault();
    if (!type) {
      setDebtPositionType(debtPositionType);
    } else {
      setDebtPositionType(type);
      await onChangeDebtInToken('0');
      setAmount('0');
      setRepayAmount({ amountInBase: 0, amountInToken: 0 });
    }
  };

  const handleChangeRepayType = async (event: React.MouseEvent<HTMLElement>, type: RepayType) => {
    event.preventDefault();
    setRepayType(type);
    setRepayAmount({
      amountInBase: 0,
      amountInToken: 0
    });
    if (type === RepayType.EQUITY) {
      await onChangeDebtInToken('0');
    } else if (type === RepayType.DEBT) {
      await onChangeAmount('0');
    }
  };

  async function onChangeRepayAmount(_repayAmount: any) {
    if (!repayType) return;

    setRepayAmount({
      amountInBase: RepayType.EQUITY ? _repayAmount : 0,
      amountInToken: RepayType.DEBT ? _repayAmount : 0
    });
    let repayDebtInBase = 0;

    if (repayType === RepayType.EQUITY) {
      repayDebtInBase = _repayAmount;
    } else {
      const _repayDebtInBase = await swapDebtOutToken(String(_repayAmount));
      repayDebtInBase = Number(_repayDebtInBase || 0);
    }
    const _positionValueInBase: number = Number(position?.positionValueInBase);
    const _debtInBase = _positionValueInBase - Number(position?.equityValue) - repayDebtInBase;
    const _equityValue = _positionValueInBase - _debtInBase;
    const _debtRatio = (_debtInBase / _positionValueInBase) * 100;
    const _safetyBuffer = Number(position?.killFactor) - _debtRatio;
    setUpdatedPosition({
      ...position!,
      positionValueInBase: _positionValueInBase.toFixed(1),
      equityValue: _equityValue.toFixed(1),
      debtInBase: _debtInBase.toFixed(1),
      deptRatio: _debtRatio.toFixed(1),
      safetyBuffer: _safetyBuffer.toFixed(1),
      swappedInBase: repayType === RepayType.DEBT ? repayDebtInBase.toFixed(1) : '0'
    });
  }

  async function onChangeAmount(_amount: any) {
    if (Number(evmosBalance) === 0) return;
    setAmount(_amount);
    const deptInBase = (Number(leverage) - 1) * Number(_amount);
    setDebtInBase(deptInBase.toFixed(1));
    setPositionValue((Number(_amount) + deptInBase).toFixed(1));
    await reCalculatePosition(deptInBase, Number(_amount) * (equityPositionType === PositionType.REMOVE ? -1 : 1));
  }

  async function onChangeDebtInToken(_debtInToken: any) {
    if (Number(borrowingAssetBalance) === 0) return;
    setDebtInToken(_debtInToken);
    // setDebtInToken((Number(_debtInBase || 0) * (debtPositionType === PositionType.REMOVE ? -1 : 1)).toFixed(0));
    const _debtInBase = await swapDebtOutToken(String(_debtInToken || 0));
    setPositionValue((Number(amount) + Number(_debtInBase || 0)).toFixed(1));
    await reCalculatePosition(
      Number(_debtInBase || 0) * (debtPositionType === PositionType.REMOVE ? -1 : 1),
      Number(amount)
    );
  }

  async function getStakingAPR() {
    return fetch(`/api/yield/evmos`).then((res) => res.json());
  }

  async function getInterestFromVault() {
    const _lastAnnualRateBps: BigNumber = await vaultContract.lastAnnualRateBps();
    const _reservedBps: BigNumber = await stayKingContract.reservedBps();
    return (
      Number(convertUnitFrom(_lastAnnualRateBps.toString(), '2')) +
      Number(convertUnitFrom(_reservedBps.toString(), '2'))
    );
  }

  async function loadYieldStaking(equity: number, debt: number) {
    let debtPerEquity = equity ? Number((debt / equity).toFixed(2)) : 1;
    if (debtPerEquity < 1) debtPerEquity = 1;
    const _result = await getStakingAPR();
    const _apr = Number(_result.data.apr) - 15;
    // const apy = calculateAPYFromAPR((_apr / 100).toFixed(2));
    const _borrowingInterest = await getInterestFromVault();
    const borrowingInterest = Number(_borrowingInterest) * debtPerEquity;
    const apr = _apr * debtPerEquity;
    const totalApr = _apr * debtPerEquity - borrowingInterest;
    const totalApy = calculateAPYFromAPR((totalApr / 100).toFixed(2));

    setYieldStaking({
      ...yieldStaking,
      apy: totalApy.toFixed(2),
      apr: apr.toFixed(2),
      borrowingInterest: borrowingInterest.toFixed(2),
      totalApr: totalApr.toFixed(2)
    });
  }

  async function reCalculatePosition(deptInBase: number, amount: number) {
    const _positionValueInBase: number = Number(position?.positionValueInBase) + (Number(amount) + deptInBase);
    const _debtInBase = _positionValueInBase - Number(position?.equityValue) - Number(amount);
    const _equityValue = _positionValueInBase - Number(position?.debtInBase) - deptInBase;
    const _debtRatio = (_debtInBase / _positionValueInBase) * 100;
    const _safetyBuffer = Number(position?.killFactor) - _debtRatio;
    setUpdatedPosition({
      ...position!,
      positionValueInBase: _positionValueInBase.toFixed(1),
      equityValue: _equityValue.toFixed(1),
      debtInBase: _debtInBase.toFixed(1),
      deptRatio: _debtRatio.toFixed(1),
      safetyBuffer: _safetyBuffer.toFixed(1)
    });
    await loadYieldStaking(_equityValue, _debtInBase);
  }

  async function loadLendingPoolAsset() {
    const _balance = await tokenContract.balanceOf(contractsInfo[Contracts.vault].address);
    setBorrowingAssetBalance(convertUnitFrom(_balance, 18));
  }

  async function swapDebtOutToken(_deptInToken: string) {
    const _deptInBase = await vaultContract.getTokenOut(_deptInToken);
    setDebtInBase(convertUnitFrom(_deptInBase, 0));
    return convertUnitFrom(_deptInBase, 0);
  }

  async function getPositionFrom() {
    const position = await stayKingContract.positionInfo(address, contractsInfo[Contracts.tUSDC].address);
    const _killFactor = await stayKingContract.killFactorBps();

    if (position && position.length > 0) {
      const _positionValueInBase = Number(convertUnitFrom(position[0], '18')) || 0;
      const _deptInBase = Number(convertUnitFrom(position[1], '18')) || 0;
      const myPosition: Position = {
        positionValueInBase: _positionValueInBase.toFixed(1),
        equityValue: (_positionValueInBase - _deptInBase).toFixed(1),
        debtInBase: _deptInBase.toFixed(1),
        deptRatio: ((_deptInBase / _positionValueInBase) * 100).toFixed(1),
        killFactor: (Number(convertUnitFrom(_killFactor, '0')) / 100).toFixed(1),
        safetyBuffer: (
          Number(convertUnitFrom(_killFactor, '0')) / 100 -
          (_deptInBase / _positionValueInBase) * 100
        ).toFixed(1)
      };
      setPosition(myPosition);
      setUpdatedPosition(myPosition);
    }
  }

  async function beforeAdjust() {
    const equityInBaseChanged = Number(updatedPosition?.equityValue) - Number(position?.equityValue);
    const debtInBaseChanged = Number(updatedPosition?.debtInBase) - Number(position?.debtInBase);

    if (equityInBaseChanged * debtInBaseChanged < 0) {
      setNoticePopupOpen(true);
    } else {
      await adjust();
    }
  }

  async function adjust() {
    let equityInBaseChanged = 0;
    let debtInBaseChanged = 0;
    let repaidDebt = 0;
    let valueObj = null;

    if (repayType) {
      if (repayType === RepayType.EQUITY) {
        valueObj = {
          value: convertDenomFrom(String(repayAmount.amountInBase || 0))
        };
      } else {
        repaidDebt = repayAmount.amountInToken || 0;
        const approveTx = await tokenContract.approve(
          contractsInfo[Contracts.vault].address,
          convertDenomFrom(String(repaidDebt))
        );
        approveTx.wait();
      }
    } else {
      equityInBaseChanged = Number(updatedPosition?.equityValue) - Number(position?.equityValue);
      if (equityInBaseChanged > 0) {
        valueObj = {
          value: convertDenomFrom(String(equityInBaseChanged))
        };
      }
      debtInBaseChanged = Number(updatedPosition?.debtInBase) - Number(position?.debtInBase);
    }

    onChangeIsPendingState(true);
    try {
      const result = await getTxOfChangePosition(
        convertDenomFrom(String(equityInBaseChanged)),
        convertDenomFrom(String(debtInBaseChanged)),
        convertDenomFrom(String(repaidDebt)),
        valueObj
      );
      closeModal();
      enqueueSnackbar(`Transaction Hash: ${result['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar(e.toString(), { variant: 'error' });
    }
  }

  function getTxOfChangePosition(
    _equityInBaseChanged: BigNumber,
    _debtInBaseChanged: BigNumber,
    _repaidDebt: BigNumber,
    _valueObj?: any
  ) {
    if (_valueObj) {
      return stayKingContract.changePosition(
        contractsInfo[Contracts.tUSDC].address,
        _equityInBaseChanged,
        _debtInBaseChanged,
        _repaidDebt,
        _valueObj
      );
    }
    return stayKingContract.changePosition(
      contractsInfo[Contracts.tUSDC].address,
      _equityInBaseChanged,
      _debtInBaseChanged,
      _repaidDebt
    );
  }

  function registerContractEvents() {
    stayKingContract.on('PositionChanged', async (...args) => {
      onChangeIsPendingState(false);
    });
  }

  async function init() {
    await getPositionFrom();
    await loadLendingPoolAsset();
    await loadYieldStaking(0, 0);
    registerContractEvents();
  }

  useEffect(() => {
    stayKingContract = getContract(Contracts.stayKing);
    vaultContract = getContract(Contracts.vault);
    tokenContract = getContract(Contracts.tUSDC);

    (async (address) => {
      address && (await init());
    })(address);
  }, []);

  return {
    max,
    setMax,
    leverage,
    setLeverage,
    adjust,
    evmosBalance,
    amount,
    setAmount,
    position,
    debtInToken,
    onChangeAmount,
    positionValue,
    setDebtInToken,
    onChangeDebtInToken,
    deptInBase: debtInBase,
    borrowingAssetBalance,
    updatedPosition,
    handleChangeEquityType,
    equityPositionType,
    handleChangeDebtType,
    debtPositionType,
    repayType,
    repayAmount,
    onChangeRepayAmount,
    handleChangeRepayType,
    yieldStaking,
    loadYieldStaking,
    noticePopupOpen,
    handleNoticePopup,
    beforeAdjust
  };
};

export default useAdjust;
