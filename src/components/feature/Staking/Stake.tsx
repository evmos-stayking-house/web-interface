import React, { useState } from 'react';

import s from './Stake.module.scss';
import { cn } from '../../../utils/style';
import { Dropdown } from '@nextui-org/react';
import useStake from './Stake.Service';

const Stake = () => {
  const { leverage, onChangeLeverage, renderStakeModal, openStakeModal } = useStake();

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
            <span className={s.assetInfo__labelAndValue__label}>APY</span>
            <span className={s.assetInfo__labelAndValue__value}>TBD%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__yield)}>
          <span className={s.poolListContainerContents__item__text}>Yield Staking : TBD%</span>
          <span className={s.poolListContainerContents__item__text}>Borrowing Interest : ATOM TBD%</span>
          <span className={s.poolListContainerContents__item__text}>Total APR : TBD%</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__leverage)}>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
              {leverage}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={leverage}
              onSelectionChange={onChangeLeverage}>
              <Dropdown.Item key="1.0">1.0</Dropdown.Item>
              <Dropdown.Item key="1.5">1.5</Dropdown.Item>
              <Dropdown.Item key="2.0">2.0</Dropdown.Item>
              <Dropdown.Item key="2.5">2.5</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.buttonGroup}>
            <div
              className={cn(s.buttonGroup__depositBtn, { [s.buttonGroup__enabled]: true })}
              onClick={() => openStakeModal()}>
              Stake
            </div>
            <div className={cn(s.buttonGroup__withdrawBtn, { [s.buttonGroup__enabled]: true })} onClick={() => {}}>
              Unstake
            </div>
          </div>
        </div>
      </div>
      {renderStakeModal()}
    </div>
  );
};

export default Stake;
