import { FC, useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from 'ethers';
import { convertUnitFrom } from '../../../../utils/numberFormats';
import { contractsInfo } from '../../../../data/contract/contracts';
import { useModal } from '../../../Modal';
import Adjust from '../../../Modal/ModalContents/Position/Adjust';
import Close from '../../../Modal/ModalContents/Position/Close';

let stayKingContract: Contract;
let vaultContract: Contract;

/**
 *  position value: positionValueInBase
 *  equity value: positionValueInBase - debtInBase
 *  debt value: debtInBase
 *  debt ratio: debtInBase / positionValueInBase * 100(%)
 *  kill factor: killFactorBps / 100
 *  safety buffer: (kill factor) - (debt ratio)
 */
export interface Position {
  positionValueInBase: string;
  equityValue: string;
  debtInBase: string;
  deptRatio: string;
  killFactor: string;
  safetyBuffer: string;
}

const useActivePosition = (address: string) => {
  const [position, setPosition] = useState<Position[]>([]);

  const {
    openModal: openAdjustModal,
    renderModal: renderAdjustModal,
    closeModal: closeAdjustModal
  } = useModal({ content: <Adjust closeModal={() => closeAdjustModal()} /> });
  const { openModal: openCloseModal, renderModal: renderCloseModal } = useModal({ content: <Close /> });

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
      setPosition([myPosition]);
    }
  }

  async function init() {
    await getPositionFrom();
  }

  useEffect(() => {
    stayKingContract = getContract(Contracts.stayKing);
    vaultContract = getContract(Contracts.vault);
    (async (address) => {
      address && (await init());
    })(address);
  }, [address]);

  return {
    position,
    renderAdjustModal,
    openAdjustModal,
    renderCloseModal,
    openCloseModal
  };
};

export default useActivePosition;
