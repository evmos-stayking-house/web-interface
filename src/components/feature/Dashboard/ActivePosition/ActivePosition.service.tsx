import { FC, useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { BigNumber, Contract } from 'ethers';
import { convertUnitFrom } from '../../../../utils/numberFormats';
import { contractsInfo } from '../../../../data/contract/contracts';
import { useModal } from '../../../Modal';
import Adjust from '../../../Modal/ModalContents/Position/Adjust';
import Close from '../../../Modal/ModalContents/Position/Close';
import { calculateAPYFromAPR } from '../../../../utils/utils';

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
  killFactor?: string;
  safetyBuffer?: string;
  swappedInBase?: string;
}

interface YieldStaking {
  apr: string;
  apy: string;
  borrowingInterest: string;
  totalApr: string;
}

const useActivePosition = (address: string) => {
  const [position, setPosition] = useState<Position[]>([]);
  const [yieldStaking, setYieldStaking] = useState<YieldStaking>({
    apr: '0',
    apy: '0',
    totalApr: '0',
    borrowingInterest: '0'
  });

  const {
    openModal: openAdjustModal,
    renderModal: renderAdjustModal,
    closeModal: closeAdjustModal
  } = useModal({ content: <Adjust closeModal={() => closeAdjustModal()} /> });

  const {
    openModal: openCloseModal,
    renderModal: renderCloseModal,
    closeModal: closeModal
  } = useModal({
    content: <Close closeModal={() => closeModal()} />
  });

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
    const apy = calculateAPYFromAPR((_apr / 100).toFixed(2));
    const _borrowingInterest = await getInterestFromVault();
    const borrowingInterest = Number(_borrowingInterest) * debtPerEquity;
    const apr = _apr * debtPerEquity;
    const totalApr = _apr * debtPerEquity - borrowingInterest;
    const totalApy = apy * debtPerEquity - borrowingInterest;

    setYieldStaking({
      ...yieldStaking,
      apy: totalApy.toFixed(2),
      apr: apr.toFixed(2),
      borrowingInterest: borrowingInterest.toFixed(2),
      totalApr: totalApr.toFixed(2)
    });
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
      await loadYieldStaking(_positionValueInBase - _deptInBase, _deptInBase);
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
    openCloseModal,
    yieldStaking
  };
};

export default useActivePosition;
