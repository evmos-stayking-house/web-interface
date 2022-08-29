import { useEffect, useState } from 'react';
import { useWalletState } from '../../../../../contexts/WalletContext';
import { contractsInfo } from '../../../../../data/contract/contracts';
import { Contracts } from '../../../../../type/contract';
import { convertDenomFrom, convertUnitFrom } from '../../../../../utils/numberFormats';
import { Position } from '../../../../feature/Dashboard/ActivePosition/ActivePosition.service';
import { Contract } from 'ethers';
import { getContract } from '../../../../../config/contract';
import { useSnackbar } from 'notistack';

let stayKingContract: Contract;
let vaultContract: Contract;

export enum CloseType {
  Entire = 'Close Entire Position',
  Partial = 'Partially Close Position'
}

const closePositions: readonly string[] = [CloseType.Entire, CloseType.Partial];

interface ResultSummary {
  equity: string;
  deptInBase: string;
  deptInToken: string;
  estimated: string;
  positionValueInBase: string;
}

const useClosePosition = (closeModal: VoidFunction) => {
  const { address, onChangeIsPendingState } = useWalletState();
  const { enqueueSnackbar } = useSnackbar();
  const [result, setResult] = useState<ResultSummary | null>(null);
  const [closeType, setCloseType] = useState<CloseType>(CloseType.Entire);

  async function getPosition(): Promise<Position | null> {
    const position = await stayKingContract.positionInfo(address, contractsInfo[Contracts.tUSDC].address);

    if (position && position.length > 0) {
      const _positionValueInBase = Number(convertUnitFrom(position[0], '18')) || 0;
      const _deptInBase = Number(convertUnitFrom(position[1], '18')) || 0;
      return {
        positionValueInBase: _positionValueInBase.toFixed(1),
        equityValue: (_positionValueInBase - _deptInBase).toFixed(1),
        debtInBase: _deptInBase.toFixed(1),
        deptRatio: ((_deptInBase / _positionValueInBase) * 100).toFixed(1)
      };
    }
    return null;
  }

  async function getTotalShareOf() {
    const _totalShare = await stayKingContract.totalShare();
    return convertUnitFrom(_totalShare, '18');
  }
  async function getTotalAmountOf() {
    const _totalAmount = await stayKingContract.totalAmount();
    return convertUnitFrom(_totalAmount, '18');
  }

  async function getTokenOut(deptInBase: string) {
    return vaultContract.getTokenOut(Number(deptInBase).toFixed(0));
  }

  async function calculatedEVMOS() {
    const position = await getPosition();

    const equity = Number(position?.equityValue);
    const deptInBase = Number(position?.debtInBase);
    const totalShare = Number(await getTotalShareOf());
    const totalAmount = Number(await getTotalAmountOf());
    const _deptInToken = await getTokenOut(position?.debtInBase || '0');
    const estimated = ((totalShare * (equity + deptInBase)) / totalAmount - deptInBase).toFixed(1);

    setResult({
      estimated,
      positionValueInBase: position?.positionValueInBase || '0.0',
      debtInToken: convertUnitFrom(_deptInToken, '0'),
      equity: equity.toFixed(1),
      deptInBase: deptInBase.toFixed(1)
    });
  }

  async function removePosition() {
    onChangeIsPendingState(true);
    try {
      const result = await stayKingContract.removePosition(contractsInfo[Contracts.tUSDC].address);
      closeModal();
      enqueueSnackbar(`Transaction Hash: ${result['hash']}`, { variant: 'success' });
    } catch (e: any) {
      onChangeIsPendingState(false);
      enqueueSnackbar(e.toString(), { variant: 'error' });
    }
  }

  function registerContractEvents() {
    stayKingContract.on('RemovePosition', async (...args) => {
      onChangeIsPendingState(false);
    });
  }

  async function init() {
    await calculatedEVMOS();
    registerContractEvents();
  }

  useEffect(() => {
    vaultContract = getContract(Contracts.vault);
    stayKingContract = getContract(Contracts.stayKing);

    (async (_address) => {
      _address && (await init());
    })(address);
  }, []);

  return {
    result,
    removePosition,
    closeType,
    setCloseType,
    closePositions
  };
};

export default useClosePosition;
