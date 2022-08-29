import React, { useEffect, useState } from 'react';
import { useWalletState } from '../../../../../contexts/WalletContext';
import { contractsInfo } from '../../../../../data/contract/contracts';
import { Contracts } from '../../../../../type/contract';
import { convertDenomFrom, convertUnitFrom } from '../../../../../utils/numberFormats';
import { Position } from '../../../../feature/Dashboard/ActivePosition/ActivePosition.service';
import { Contract } from 'ethers';
import { getContract } from '../../../../../config/contract';

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
  const [repayType, setRepayType] = useState<string>(RepayType.EQUITY);

  const [equityPositionType, setEquityPositionType] = React.useState<PositionType>(PositionType.ADD);
  const [debtPositionType, setDebtPositionType] = React.useState<PositionType>(PositionType.ADD);

  const handleChangeEquityType = async (event: React.MouseEvent<HTMLElement>, type: PositionType) => {
    event.preventDefault();
    if (!type) {
      setEquityPositionType(equityPositionType);
    } else {
      setEquityPositionType(type);
      await onChangeAmount('0');
      setDebtInToken('0');
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
    }
  };

  const handleChangeRepayType = async (event: React.MouseEvent<HTMLElement>, type: RepayType) => {
    event.preventDefault();
    if (!type) {
      setRepayType(repayType);
    } else {
      setRepayType(type);
      // await onChangeDebtInToken('0');
      // setAmount('0');
    }
  };

  async function onChangeAmount(_amount: any) {
    if (Number(evmosBalance) === 0) return;
    setAmount(_amount);
    const deptInBase = (Number(leverage) - 1) * Number(_amount);
    setDebtInBase(deptInBase.toFixed(1));
    setPositionValue((Number(_amount) + deptInBase).toFixed(1));
    await reCalculatePosition(deptInBase, Number(_amount) * (equityPositionType === PositionType.REMOVE ? -1 : 1));

    // setDebtInToken('0');
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

  async function adjust() {
    if (Number(amount) > 0) {
      const result = await stayKingContract.addEquity(
        contractsInfo[Contracts.tUSDC].address,
        convertDenomFrom(amount),
        {
          value: convertDenomFrom(amount)
        }
      );
      if (result && result['hash']) {
        closeModal();
        alert(`txHash: ${result['hash']} \n Please wait for transaction to confirm on the network...`);
      }
      return;
    }

    if (Number(debtInBase) > 0) {
      const result = await stayKingContract.addDebt(
        contractsInfo[Contracts.tUSDC].address,
        convertDenomFrom(debtInBase)
      );
      if (result && result['hash']) {
        closeModal();
        alert(`txHash: ${result['hash']} \n Please wait for transaction to confirm on the network...`);
      }
      return;
    }
  }

  async function init() {
    await getPositionFrom();
    await loadLendingPoolAsset();
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
    handleChangeRepayType
  };
};

export default useAdjust;
