import React, { useState } from 'react';

import s from './Stake.module.scss';
import { cn } from '../../../utils/style';
import useStake from './Stake.service';
import { Autocomplete, TextField } from '@mui/material';
import { LEVERAGE_OPTIONS } from '../../../config/constants';

const Stake = () => {
  const {
    leverage,
    yieldStaking,
    loadYieldStaking,
    setLeverage,
    renderStakeModal,
    hasPosition,
    openStakeModal,
    renderUnStakeModal,
    openUnStakeModal
  } = useStake();

  return (
    <div className={s.container}>
      <div className={s.title}>Staking Pools</div>
      <div className={s.poolListContainerHeader}>
        <div>Asset/Chain</div>
        <div>APY</div>
        <div>Yield</div>
        <div>Leverage</div>
        <div>&nbsp;</div>
      </div>
      <div className={s.poolListContainerContents}>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <img className={s.assetInfo__icon} src={'/img/logo/evmos.png'} alt={'evmos symbol'} />
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>EVMOS</p>
              <p className={s.assetInfo__info__priceInfo}>Evmos</p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__value}>{yieldStaking.apy}%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__yield)}>
          <span className={s.poolListContainerContents__item__text}>Yield Staking : {yieldStaking.apr}%</span>
          <span className={s.poolListContainerContents__item__text}>
            Borrowing Interest : USDC {yieldStaking.borrowingInterest}%
          </span>
          <span className={s.poolListContainerContents__item__text}>Total APR : {yieldStaking.totalApr}%</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__leverage)}>
          <Autocomplete
            value={leverage || '1.0'}
            disableClearable={true}
            onChange={(event: any, newValue: string | null) => {
              event.preventDefault();
              setLeverage(newValue);
              loadYieldStaking(newValue);
            }}
            id="leverage-adjust-modal"
            options={LEVERAGE_OPTIONS}
            style={{ width: 120, background: '#D9D9D9', color: '#4D4545', borderRadius: 8 }}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.buttonGroup}>
            {!hasPosition && (
              <div
                className={cn(s.buttonGroup__depositBtn, { [s.buttonGroup__enabled]: true })}
                onClick={() => openStakeModal()}>
                Stake
              </div>
            )}
            <div
              className={cn(s.buttonGroup__withdrawBtn, { [s.buttonGroup__enabled]: true })}
              onClick={() => openUnStakeModal()}>
              Unstake
            </div>
          </div>
        </div>
      </div>
      {renderStakeModal()}
      {renderUnStakeModal()}
    </div>
  );
};

export default Stake;
