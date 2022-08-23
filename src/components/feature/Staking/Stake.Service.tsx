import React, { useState } from 'react';
import { useModal } from '../../Modal';
import StakeM from '../../Modal/ModalContents/StakeM/StakeM';
import { getValueFromSet } from '../../../utils/utils';

const useStake = () => {
  const [leverage, setLeverage] = useState<any>(new Set(['1.0']));

  const {
    renderModal: renderStakeModal,
    openModal: openStakeModal,
    closeModal: closeStakeModal
  } = useModal({ content: <StakeM closeModal={() => {}} parentLeverage={leverage} /> });

  return {
    leverage,
    setLeverage,
    renderStakeModal,
    openStakeModal
  };
};

export default useStake;
