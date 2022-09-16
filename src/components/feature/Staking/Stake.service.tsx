import React, { useEffect, useState } from 'react';
import { useModal } from '../../Modal';
import StakeM from '../../Modal/ModalContents/StakeM/StakeM';
import { getContract } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { BigNumber, Contract } from 'ethers';
import { useWalletState } from '../../../contexts/WalletContext';
import { contractsInfo } from '../../../data/contract/contracts';
import { convertUnitFrom } from '../../../utils/numberFormats';
import Close from '../../Modal/ModalContents/Position/Close';
import { calculateAPYFromAPR } from '../../../utils/utils';

let stayKingContract: Contract;
let vaultContract: Contract;

interface YieldStaking {
  apr: string;
  apy: string;
  borrowingInterest: string;
  totalApr: string;
}

const useStake = () => {
  const { address } = useWalletState();
  const [leverage, setLeverage] = useState<string | null>('1.0');
  const [hasPosition, setHasPosition] = useState<boolean>(false);
  const [yieldStaking, setYieldStaking] = useState<YieldStaking>({
    apr: '0',
    apy: '0',
    totalApr: '0',
    borrowingInterest: '0'
  });
  const {
    renderModal: renderStakeModal,
    openModal: openStakeModal,
    closeModal: closeStakeModal
  } = useModal({
    content: <StakeM yieldStaking={yieldStaking} closeModal={() => closeStakeModal()} parentLeverage={leverage} />
  });

  const {
    renderModal: renderUnStakeModal,
    openModal: openUnStakeModal,
    closeModal: closeUnStakeModal
  } = useModal({ content: <Close closeModal={() => closeUnStakeModal()} /> });

  async function getPositionFrom() {
    const position = await stayKingContract.positionInfo(address, contractsInfo[Contracts.tUSDC].address);
    const positionValue = convertUnitFrom(position[0]);
    setHasPosition(Number(positionValue) > 0);
  }

  async function getInterestFromVault() {
    const _utilizationRateBps = await vaultContract.utilizationRateBps();
    const utilizationRateBps = convertUnitFrom(_utilizationRateBps.toString(), '2');
    return (Number(utilizationRateBps) / 3).toFixed(2);
  }

  async function loadYieldStaking(_leverage?: any) {
    const _result = await getStakingAPR();
    const _apr = Number(_result.data.apr) - 10;
    // const apy = calculateAPYFromAPR((_apr / 100).toFixed(2));
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

  async function init() {
    await getPositionFrom();
    await loadYieldStaking();
  }

  useEffect(() => {
    stayKingContract = getContract(Contracts.stayKing);
    vaultContract = getContract(Contracts.vault);
    (async (address) => {
      address && (await init());
    })(address);
  }, [address]);

  return {
    leverage,
    setLeverage,
    renderStakeModal,
    openStakeModal,
    renderUnStakeModal,
    openUnStakeModal,
    hasPosition,
    yieldStaking,
    loadYieldStaking
  };
};

export default useStake;
