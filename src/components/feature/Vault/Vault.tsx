import s from './Vault.module.scss';
import { cn } from '../../../utils/style';

const Vault = () => {

  return (
    <div className={s.container}>
      <div className={s.title}>
        Lending Pools
      </div>
      <div className={s.poolListContainerHeader}>
        <div>Asset</div>
        <div>APR/APY</div>
        <div>Total Supply</div>
        <div>Total Borrowed</div>
        <div>Utilization</div>
        <div>My Balance</div>
        <div>&nbsp;</div>
      </div>
      <div className={s.poolListContainerContents}>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <img className={s.assetInfo__icon} src={'/img/logo/cosmos.png'}  alt={'lending an asset atom symbol'}/>
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>
                ATOM
              </p>
              <p className={s.assetInfo__info__priceInfo}>
                1 ibATOM= 1.0004 ATOM
              </p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>Lending APR</span>
            <span className={s.assetInfo__labelAndValue__value}>0.0207%</span>
          </div>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>Lending APR</span>
            <span className={s.assetInfo__labelAndValue__value}>0.0207%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalSupply)}>
          <span className={s.poolListContainerContents__item__tokenValue}>7.33M</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>300,300</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
        </div>
        <div className={s.poolListContainerContents__item}>
          40.8%
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>0</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ibATOM</span>
          </div>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>0</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.buttonGroup}>
            <div className={cn(s.buttonGroup__depositBtn, { [s.buttonGroup__enabled]: true })}>Deposit</div>
            <div className={cn(s.buttonGroup__withdrawBtn, { [s.buttonGroup__enabled]: true })}>Withdraw</div>
          </div>
        </div>

        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <img className={s.assetInfo__icon} src={'/img/logo/osmosis.png'}  alt={'lending an asset osmo symbol'}/>
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>
                OSMO (Upcoming)
              </p>
              <p className={s.assetInfo__info__priceInfo}>
                1 ibOSMO= 1.0000 OSMO
              </p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>Lending APR</span>
            <span className={s.assetInfo__labelAndValue__value}>0%</span>
          </div>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>Lending APR</span>
            <span className={s.assetInfo__labelAndValue__value}>0%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalSupply)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>OSMO</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>OSMO</span>
        </div>
        <div className={s.poolListContainerContents__item}>
          0%
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>0</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ibOSMO</span>
          </div>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>0</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>OSMO</span>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.buttonGroup}>
            <div className={cn(s.buttonGroup__depositBtn, { [s.buttonGroup__disabled]: true })}>Deposit</div>
            <div className={cn(s.buttonGroup__withdrawBtn, { [s.buttonGroup__disabled]: true })}>Withdraw</div>
          </div>
        </div>

        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <img className={s.assetInfo__icon} src={'/img/logo/juno.png'}  alt={'lending an asset juno symbol'}/>
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>
                JUNO (Upcoming)
              </p>
              <p className={s.assetInfo__info__priceInfo}>
                1 ibJUNO= 1.0000 JUNO
              </p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>Lending APR</span>
            <span className={s.assetInfo__labelAndValue__value}>0%</span>
          </div>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>Lending APR</span>
            <span className={s.assetInfo__labelAndValue__value}>0%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalSupply)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>JUNO</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>JUNO</span>
        </div>
        <div className={s.poolListContainerContents__item}>
          0%
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>0</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ibATOM</span>
          </div>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>0</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.buttonGroup}>
            <div className={cn(s.buttonGroup__depositBtn, { [s.buttonGroup__disabled]: true })}>Deposit</div>
            <div className={cn(s.buttonGroup__withdrawBtn, { [s.buttonGroup__disabled]: true })}>Withdraw</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
