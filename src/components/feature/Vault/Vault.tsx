import s from './Vault.module.scss';
import { cn } from '../../../utils/style';
import useVault from './Vault.Service';

enum ModalType {
  deposit = 'deposit',
  withdraw = 'withdraw'
}

const Vault = () => {
  const {
    ibBalance,
    vaultTokenBalance,
    utilizationRate,
    totalSupply,
    totalBorrowed,
    interestRate,
    openDepositModal,
    openWithdrawModal,
    renderDepositModal,
    renderWithdrawModal,
    ibTokenRatioWithToken
  } = useVault();

  return (
    <div className={s.container}>
      <div className={s.title}>Lending Pools</div>
      <div className={s.poolListContainerHeader}>
        <div>Asset/Chain</div>
        <div>APY</div>
        <div>Total Supply</div>
        <div>Total Borrowed</div>
        <div>Utilization</div>
        <div>Balance</div>
        <div>&nbsp;</div>
      </div>
      <div className={s.poolListContainerContents}>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <img className={s.assetInfo__icon} src={'/img/logo/cosmos.png'} alt={'lending an asset atom symbol'} />
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>ATOM</p>
              <p className={s.assetInfo__info__priceInfo}>Cosmos Hub</p>
              <p className={s.assetInfo__info__priceInfo}>{ibTokenRatioWithToken}</p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>APY</span>
            <span className={s.assetInfo__labelAndValue__value}>{interestRate}%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalSupply)}>
          <span className={s.poolListContainerContents__item__tokenValue}>{totalSupply}</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>{totalBorrowed}</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>{utilizationRate}</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>%</span>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>{ibBalance}</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ibATOM</span>
          </div>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>{vaultTokenBalance}</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.buttonGroup}>
            <div
              className={cn(s.buttonGroup__depositBtn, { [s.buttonGroup__enabled]: true })}
              onClick={() => openDepositModal()}>
              Deposit
            </div>
            <div
              className={cn(s.buttonGroup__withdrawBtn, { [s.buttonGroup__enabled]: true })}
              onClick={() => openWithdrawModal()}>
              Withdraw
            </div>
          </div>
        </div>

        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <img className={s.assetInfo__icon} src={'/img/logo/osmosis.png'} alt={'lending an asset osmo symbol'} />
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>OSMO</p>
              <p className={s.assetInfo__info__priceInfo}>Cosmos Hub</p>
              <p className={s.assetInfo__info__priceInfo}>1 ibOSMO= 1.0000 OSMO</p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>APY</span>
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
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>%</span>
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
            <img className={s.assetInfo__icon} src={'/img/logo/juno.png'} alt={'lending an asset juno symbol'} />
            <div className={s.AssetInfo__info}>
              <p className={s.assetInfo__info__title}>JUNO</p>
              <p className={s.assetInfo__info__priceInfo}>Cosmos Hub</p>
              <p className={s.assetInfo__info__priceInfo}>1 ibJUNO= 1.0000 JUNO</p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__label}>APY</span>
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
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>%</span>
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
      {renderDepositModal()}
      {renderWithdrawModal()}
    </div>
  );
};

export default Vault;
