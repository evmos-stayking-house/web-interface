import s from './Vault.module.scss';
import { cn } from '../../../utils/style';
import useVault from './Vault.service';
import { numberFormat } from '../../../utils/numberFormats';
import Image from 'next/image';

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
      {/* Title */}
      <div className={s.title}>Lending Pools</div>
      {/* Header */}
      <div className={s.poolListContainerHeader}>
        <div>Asset/Chain</div>
        <div>Expected APY</div>
        <div>Total Supply</div>
        <div>Total Borrowed</div>
        <div>Utilization</div>
        <div>Balance</div>
        <div>&nbsp;</div>
      </div>
      {/* Contents */}
      <div className={s.poolListContainerContents}>
        {/* Leveraged Asset - USDC */}
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <Image width={52} height={52} src={'/img/logo/usdc.png'} alt={'lending an asset usdc symbol'} />
            <div className={s.assetInfo__info}>
              <p className={s.assetInfo__info__title}>USDC</p>
              <p className={s.assetInfo__info__priceInfo}>Ethereum</p>
              <p className={s.assetInfo__info__priceInfo}>{ibTokenRatioWithToken}</p>
            </div>
          </div>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo__labelAndValue}>
            <span className={s.assetInfo__labelAndValue__value}>{numberFormat(interestRate)}%</span>
          </div>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalSupply)}>
          <span className={s.poolListContainerContents__item__tokenValue}>{numberFormat(totalSupply, 1)}</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>USDC</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>{numberFormat(totalBorrowed, 1)}</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>USDC</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>{utilizationRate}</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>%</span>
        </div>
        <div className={s.poolListContainerContents__item}>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>{numberFormat(ibBalance, 1)}</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>ibUSDC</span>
          </div>
          <div className={s.poolListContainerContents__item__tokenBalance}>
            <span className={s.poolListContainerContents__item__tokenValue}>{numberFormat(vaultTokenBalance, 1)}</span>
            <span className={s.poolListContainerContents__item__tokenSymbol}>USDC</span>
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
        {/* Leveraged Asset - ATOM */}
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <Image width={52} height={52} src={'/img/logo/cosmos.png'} alt={'lending an asset atom symbol'} />
            <div className={s.assetInfo__info}>
              <p className={s.assetInfo__info__title}>ATOM</p>
              <p className={s.assetInfo__info__priceInfo}>Cosmos Hub</p>
              <p className={s.assetInfo__info__priceInfo}>1 ibATOM= 1.0000 ATOM</p>
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
          <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
        </div>
        <div className={cn(s.poolListContainerContents__item, s.poolListContainerContents__item__totalBorrowed)}>
          <span className={s.poolListContainerContents__item__tokenValue}>0</span>
          <span className={s.poolListContainerContents__item__tokenSymbol}>ATOM</span>
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
        {/* Leveraged Asset - OSMO */}
        <div className={s.poolListContainerContents__item}>
          <div className={s.assetInfo}>
            <Image width={52} height={52} src={'/img/logo/osmosis.png'} alt={'lending an asset osmosis symbol'} />
            <div className={s.assetInfo__info}>
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
      </div>
      {renderDepositModal()}
      {renderWithdrawModal()}
    </div>
  );
};

export default Vault;
