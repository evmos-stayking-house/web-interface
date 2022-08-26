import React, { useEffect, useState } from 'react';
import { useModal } from '../../Modal';
import StakeM from '../../Modal/ModalContents/StakeM/StakeM';
import { getContract } from '../../../config/contract';
import { Contracts } from '../../../type/contract';
import { Contract } from 'ethers';
import { useWalletState } from '../../../contexts/WalletContext';
import { contractsInfo } from '../../../data/contract/contracts';
import { convertUnitFrom } from '../../../utils/numberFormats';
import UnStake from '../../Modal/ModalContents/UnStake';
import Close from '../../Modal/ModalContents/Position/Close';

let stayKingContract: Contract;

const useStake = () => {
  const { address } = useWalletState();
  const [leverage, setLeverage] = useState<string | null>('1.0');
  const [hasPosition, setHasPosition] = useState<boolean>(false);

  const {
    renderModal: renderStakeModal,
    openModal: openStakeModal,
    closeModal: closeStakeModal
  } = useModal({ content: <StakeM closeModal={() => closeStakeModal()} parentLeverage={leverage} /> });

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

  async function init() {
    await getPositionFrom();
  }

  useEffect(() => {
    stayKingContract = getContract(Contracts.stayKing);
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
    hasPosition
  };
};

export default useStake;
