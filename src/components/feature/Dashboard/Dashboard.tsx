import s from './Dashboard.module.scss';
import useCoinPrice from '../../../hooks/useCoinPrice';
import { useWalletState } from '../../../contexts/WalletContext';
import useDashboard from './Dashboard.Service';
import { cn } from '../../../utils/style';
import { useState } from 'react';
import { numberFormat } from '../../../utils/numberFormats';
import ActivePosition from './ActivePosition';
import LiquidatedPosition from './LiquidatedPosition';
import Image from 'next/image';

export enum PositionTab {
  Active = 'Active',
  Liquidated = 'Liquidated'
}

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<PositionTab>(PositionTab.Active);
  const { evmosBalance, address } = useWalletState();
  const { coinPrice: evmosPrice } = useCoinPrice(`evmos`);
  const { tvl, ibToken, tokenAmount } = useDashboard(address);

  function onSetSelectedTab(_selTab: PositionTab) {
    setSelectedTab(_selTab);
  }

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
                <span className={cn(s.tabs__tab, { [s.tabs__tab__selected]: true })}>Earned</span>
                <span className={cn(s.tabs__tab, { [s.tabs__tab__selected]: false })}>Locked</span>
                <span className={cn(s.tabs__tab, { [s.tabs__tab__selected]: false })}>Unlockable</span>
              </div>
              <p className={s.value}>
                {numberFormat(Number(evmosBalance).toFixed(3))}
                <span className={s.balanceBox__value__unit}>&nbsp;EVMOS</span>
              </p>
              <p className={s.description}>
                ~ ${evmosPrice && numberFormat((evmosPrice * Number(evmosBalance)).toFixed(0))}
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
                {numberFormat(ibToken)}
                <span className={s.balanceBox__value__unit}>&nbsp;ibUSDC</span>
              </p>
              <p className={s.description}>~ {numberFormat(tokenAmount)}&nbsp;USDC</p>
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
            onClick={() => onSetSelectedTab(PositionTab.Active)}>
            <span className={s.label}>Active Positions</span>
          </div>
          <div
            className={cn(s.tab, { [s.activeTab]: selectedTab === PositionTab.Liquidated })}
            onClick={() => onSetSelectedTab(PositionTab.Liquidated)}>
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
