import React from 'react';

import s from './Stake.module.scss';
import { cn } from '../../../utils/style';

const Stake = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>
        Leveraged Staking
      </div>
      <div className={s.stakingContents}>
        {/* ATOM Asset Leveraged Staking */}
        <div className={s.stakingItem}>
          <div className={s.stakingItem__header}>
            <div className={s.stakingItem__headerLeft}>
              <div className={s.stakingItem__tokenImages}>
                <img className={s.stakingItem__tokenIcon} src={'/img/logo/cosmos.png'} alt={'atom token symbol'}/>
              </div>
              <div className={s.stakingItem__mainInfo}>
                <p className={s.stakingItem__title}>
                  Leveraged ATOM
                </p>
                <p className={s.stakingItem__tvl}>
                  TVL {'$10M'}
                </p>
              </div>
            </div>
            <div className={s.stakingItem__subInfo}>
              <p className={s.stakingItem__apy}>200%</p>
              <p className={s.stakingItem__poolInterest}>Staking Interest</p>
            </div>

          </div>
          <div className={s.stakingItem__content}>
            <div className={cn(s.stakingProperty, s.stakingProperty__flexStart)}>
              <div className={s.stakingProperty__label}>
                Yield Staking
                <p className={s.stakingProperty__labelSub}>Performance Fee 30% Applied</p>
              </div>
              <div className={s.stakingProperty__value}>140%</div>
            </div>
            <div className={s.stakingProperty}>
              <div className={s.stakingProperty__label}>
                EVMOS Rewards
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={s.stakingProperty}>
              <div className={s.stakingProperty__label}>
                Borrowing Interest
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={cn(s.stakingProperty, s.stakingProperty__totalAPR)}>
              <div className={s.stakingProperty__label}>
                Total APR
              </div>
              <div className={s.stakingProperty__value}>140%</div>
            </div>
          </div>
          <div className={s.stakingItem__footer}>
            <div className={s.LeverageController}>
              <span className={s.LeverageController__title}>Leverage</span>
              <div className={s.LeverageController__content}>
                <img className={s.LeverageController__minusIcon} src={'/img/common/minus.svg'} alt={'minus icon'} />
                <span className={s.LeverageController__leverageValue}>1</span>
                <img className={s.LeverageController__plusIcon} src={'/img/common/plus.svg'} alt={'plus icon'} />
              </div>
            </div>
            <button className={s.stakingItem__button}>Leveraged Staking 1x</button>
          </div>
        </div>
        {/* OSMO Asset Leveraged Staking */}
        <div className={cn(s.stakingItem, s.stakingItem__dim)}>
          <div className={s.stakingItem__header}>
            <div className={s.stakingItem__headerLeft}>
              <div className={s.stakingItem__tokenImages}>
                <img className={s.stakingItem__tokenIcon} src={'/img/logo/osmosis.png'} alt={'osmosis token symbol'}/>
              </div>
              <div className={s.stakingItem__mainInfo}>
                <p className={s.stakingItem__title}>
                  Leveraged OSMO
                </p>
                <p className={s.stakingItem__tvl}>
                  TVL {'$0M'}
                </p>
              </div>
            </div>
            <div className={s.stakingItem__subInfo}>
              <p className={s.stakingItem__apy}>0%</p>
              <p className={s.stakingItem__poolInterest}>Staking Interest</p>
            </div>
          </div>
          <div className={s.stakingItem__content}>
            <div className={cn(s.stakingProperty, s.stakingProperty__flexStart)}>
              <div className={s.stakingProperty__label}>
                Yield Staking
                <p className={s.stakingProperty__labelSub}>Performance Fee 30% Applied</p>
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={s.stakingProperty}>
              <div className={s.stakingProperty__label}>
                EVMOS Rewards
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={s.stakingProperty}>
              <div className={s.stakingProperty__label}>
                Borrowing Interest
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={cn(s.stakingProperty, s.stakingProperty__totalAPR)}>
              <div className={s.stakingProperty__label}>
                Total APR
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
          </div>
          <div className={s.stakingItem__footer}>
            <div className={s.LeverageController}>
              <span className={s.LeverageController__title}>Leverage</span>
              <div className={s.LeverageController__content}>
                <img className={s.LeverageController__minusIcon} src={'/img/common/minus.svg'} alt={'minus icon'} />
                <span className={s.LeverageController__leverageValue}>1</span>
                <img className={s.LeverageController__plusIcon} src={'/img/common/plus.svg'} alt={'plus icon'} />
              </div>
            </div>
            <button className={cn(s.stakingItem__button, s.stakingItem__buttonDisabled)}>Upcoming</button>
          </div>
        </div>
        {/* JUNO Asset Leveraged Staking */}
        <div className={cn(s.stakingItem, s.stakingItem__dim)}>
          <div className={s.stakingItem__header}>
            <div className={s.stakingItem__headerLeft}>
              <div className={s.stakingItem__tokenImages}>
                <img className={s.stakingItem__tokenIcon} src={'/img/logo/juno.png'} alt={'juno token symbol'}/>
              </div>
              <div className={s.stakingItem__mainInfo}>
                <p className={s.stakingItem__title}>
                  Leveraged JUNO
                </p>
                <p className={s.stakingItem__tvl}>
                  TVL {'$0M'}
                </p>
              </div>
            </div>
            <div className={s.stakingItem__subInfo}>
              <p className={s.stakingItem__apy}>0%</p>
              <p className={s.stakingItem__poolInterest}>Staking Interest</p>
            </div>

          </div>
          <div className={s.stakingItem__content}>
            <div className={cn(s.stakingProperty, s.stakingProperty__flexStart)}>
              <div className={s.stakingProperty__label}>
                Yield Staking
                <p className={s.stakingProperty__labelSub}>Performance Fee 30% Applied</p>
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={s.stakingProperty}>
              <div className={s.stakingProperty__label}>
                EVMOS Rewards
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={s.stakingProperty}>
              <div className={s.stakingProperty__label}>
                Borrowing Interest
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
            <div className={cn(s.stakingProperty, s.stakingProperty__totalAPR)}>
              <div className={s.stakingProperty__label}>
                Total APR
              </div>
              <div className={s.stakingProperty__value}>0%</div>
            </div>
          </div>
          <div className={s.stakingItem__footer}>
            <div className={s.LeverageController}>
              <span className={s.LeverageController__title}>Leverage</span>
              <div className={s.LeverageController__content}>
                <img className={s.LeverageController__minusIcon} src={'/img/common/minus.svg'} alt={'minus icon'} />
                <span className={s.LeverageController__leverageValue}>1</span>
                <img className={s.LeverageController__plusIcon} src={'/img/common/plus.svg'} alt={'plus icon'} />
              </div>
            </div>
            <button className={cn(s.stakingItem__button, s.stakingItem__buttonDisabled)}>Upcoming</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
