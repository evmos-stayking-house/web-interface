import s from './Dashboard.module.scss';
import useDashboard, { BalanceTab, PositionTab } from './Dashboard.service';
import { cn } from '../../../utils/style';
import { numberFormat } from '../../../utils/numberFormats';
import ActivePosition from './ActivePosition';
import LiquidatedPosition from './LiquidatedPosition';
import Image from 'next/image';

const Dashboard = () => {
  const {
    tvl,
    ibToken,
    tokenAmount,
    evmosBalance,
    evmosPrice,
    selectedTab,
    setSelectedTab,
    address,
    selectedBalanceTab,
    onSelectedBalanceTab
  } = useDashboard();

  return (
    <div className={s.container}>
      {/*TVL Section*/}
      <div className={s.tvlContainer}>
        <div className={s.tvlBrief}>
          <div className={s.tvlBrief__left}>
            <p className={s.tvlBrief__title}>Total Value Locked</p>
            <p className={s.tvlBrief__description}>$ {numberFormat(tvl)}</p>
          </div>
          <div className={s.tvlBrief__right}>Stayking Pre-Alpha Ver.</div>
        </div>
        <div className={s.tvlFooter}>
          <div className={s.tvlFooter__developedBy}>Developed by SOOHO.IO INC.</div>
        </div>
      </div>
      {/*My Balance Section*/}
      <div className={s.myInfoContainer}>
        <div className={s.myInfoContainer__title}>Your Balance</div>
        <div className={s.balanceContainer}>
          {/*  EVMOS balanceBox */}
          <div className={s.balanceBox}>
            <div className={s.balanceBox__left}>
              <div className={s.tabs}>
                <span
                  onClick={() => onSelectedBalanceTab(BalanceTab.Balance)}
                  className={cn(s.tabs__tab, { [s.tabs__tab__selected]: selectedBalanceTab === BalanceTab.Balance })}>
                  Balance
                </span>
                <span
                  onClick={() => onSelectedBalanceTab(BalanceTab.Locked)}
                  className={cn(s.tabs__tab, { [s.tabs__tab__selected]: selectedBalanceTab === BalanceTab.Locked })}>
                  Locked
                </span>
                <span
                  onClick={() => onSelectedBalanceTab(BalanceTab.Unlockable)}
                  className={cn(s.tabs__tab, {
                    [s.tabs__tab__selected]: selectedBalanceTab === BalanceTab.Unlockable
                  })}>
                  Unlockable
                </span>
              </div>
              <p className={s.value}>
                {numberFormat(Number(evmosBalance).toFixed(3))}
                <span className={s.value__unit}>&nbsp;EVMOS</span>
              </p>
              <p className={s.description}>
                ~ $&nbsp;
                {evmosPrice && numberFormat((evmosPrice * Number(evmosBalance)).toFixed(0))}
              </p>
            </div>
            <div className={s.balanceBox__right}>
              <Image width={64} height={64} src={'/img/logo/evmos.png'} />
            </div>
          </div>
          {/*  Space */}
          <span className={s.rowDivider} />
          {/*  USDC balanceBox */}
          <div className={s.balanceBox}>
            <div className={cn(s.balanceBox__left, s.padTop)}>
              <p className={s.value}>
                {numberFormat(ibToken, 3)}
                <span className={s.value__unit}>&nbsp;ibUSDC</span>
              </p>
              <p className={s.description}>~ {numberFormat(tokenAmount, 3)}&nbsp;USDC</p>
            </div>
            <div className={s.balanceBox__right}>
              <Image width={64} height={64} src={'/img/logo/usdc.png'} />
            </div>
          </div>
        </div>
      </div>
      {/*My Positions*/}
      <div className={s.myPositionContainer}>
        <span className={s.myPositionContainer__title}>Your Positions</span>
        <div className={s.tabsContainer}>
          <div
            className={cn(s.tab, { [s.activeTab]: selectedTab === PositionTab.Active })}
            onClick={() => setSelectedTab(PositionTab.Active)}>
            <span className={s.label}>Active Positions</span>
          </div>
          <div
            className={cn(s.tab, { [s.activeTab]: selectedTab === PositionTab.Liquidated })}
            onClick={() => setSelectedTab(PositionTab.Liquidated)}>
            <span className={s.label}>Liquidated Positions</span>
          </div>
        </div>
        {selectedTab === PositionTab.Active && <ActivePosition address={address} />}
        {selectedTab === PositionTab.Liquidated && <LiquidatedPosition />}
      </div>
    </div>
  );
};

export default Dashboard;
