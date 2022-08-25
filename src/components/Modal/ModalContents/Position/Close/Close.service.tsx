import { useEffect, useState } from 'react';
import { useWalletState } from '../../../../../contexts/WalletContext';
import { contractsInfo } from '../../../../../data/contract/contracts';
import { Contracts } from '../../../../../type/contract';
import { convertUnitFrom } from '../../../../../utils/numberFormats';
import { Position } from '../../../../feature/Dashboard/ActivePosition/ActivePosition.service';
import { Contract } from 'ethers';
import { getContract } from '../../../../../config/contract';

let stayKingContract: Contract;

const useClosePosition = (closeModal: VoidFunction) => {
  const { address } = useWalletState();
  const [evmosQuantity, setEvmosQuantity] = useState<string>('0');

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

  async function calculatedEVMOS() {
    const position = await getPosition();
    if (Number(position?.positionValueInBase) === 0) return setEvmosQuantity('0');

    const equity = Number(position?.equityValue);
    const deptInBase = Number(position?.debtInBase);
    const totalShare = Number(await getTotalShareOf());
    const totalAmount = Number(await getTotalAmountOf());

    const estimated = (totalShare * (equity + deptInBase)) / totalAmount;
    setEvmosQuantity(estimated.toFixed(1));
  }

  async function removePosition() {
    const result = await stayKingContract.removePosition(contractsInfo[Contracts.tUSDC].address);
    if (result && result['hash']) {
      closeModal();
      alert(`txHash: ${result['hash']} \n Please wait for transaction to confirm on the network...`);
    }
    return;
  }

  async function init() {
    await calculatedEVMOS();
  }

  useEffect(() => {
    stayKingContract = getContract(Contracts.stayKing);

    (async (_address) => {
      _address && (await init());
    })(address);
  }, []);

  return {
    evmosQuantity,
    removePosition
  };
};

export default useClosePosition;
