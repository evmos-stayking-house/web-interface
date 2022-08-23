import { useEffect, useState } from 'react';
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
  const [deptInToken, setDebtInToken] = useState<string>('0');
  const [deptInBase, setDebtInBase] = useState<string>('0');

  async function onChangeAmount(_amount: any) {
    setAmount(_amount);
    const deptInBase = (Number(leverage) - 1) * Number(_amount);
    setDebtInBase(deptInBase.toFixed(1));
    setPositionValue((Number(_amount) + deptInBase).toFixed(1));
    await reCalculatePosition(deptInBase, Number(_amount));

    setDebtInToken('0');
  }

  async function onChangeDebtInBase() {
    setDebtInToken(Number(deptInToken || 0).toFixed(0));
    const _deptInBase = await swapDebtOutToken(String(deptInToken || 0));
    setPositionValue((Number(amount) + Number(_deptInBase || 0)).toFixed(1));
    await reCalculatePosition(Number(_deptInBase || 0), Number(amount));
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
    const position = await stayKingContract.positionInfo(address, contractsInfo[Contracts.tATOM].address);
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
        contractsInfo[Contracts.tATOM].address,
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

    if (Number(deptInBase) > 0) {
      const result = await stayKingContract.addDebt(
        contractsInfo[Contracts.tATOM].address,
        convertDenomFrom(deptInBase)
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
    tokenContract = getContract(Contracts.tATOM);

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
    onChangeAmount,
    positionValue,
    deptInToken,
    setDebtInToken,
    onChangeDebtInBase,
    deptInBase,
    borrowingAssetBalance,
    updatedPosition
  };
};

export default useAdjust;
