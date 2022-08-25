import type { FC, ReactNode } from 'react';

import { Button } from '@mui/material';
import s from './StakeConfirm.module.scss';
import React from 'react';

interface Props {
  closeModal: VoidFunction;
  onPropConfirm: VoidFunction;
}

const StakeConfirm: FC<Props> = ({ closeModal, onPropConfirm }) => {
  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <span className={s.titleContainer__title}>STAYKING Alert</span>
        <img className={s.titleContainer__logo} src={`/img/logo/logo.png`} alt={'service logo'} />
      </div>
      <div className={s.divider}></div>
      <div className={s.contentContainer}>
        <span className={s.desc}>Please note that your position will be subject to 14 - days lock schedule.</span>
        <span className={s.desc}>
          This means that you will not be able to withdraw your total position amount and rewards{' '}
        </span>
        <span className={s.desc}>until 14 days after you unstake your position. This is to </span>
        <span className={s.desc}>simulate the unbonding period of EVMOS mainnet.</span>
      </div>
      <div className={s.btnWrapper}>
        <Button
          className={s.confirmBtn}
          onClick={() => {
            closeModal();
            onPropConfirm();
          }}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default StakeConfirm;
