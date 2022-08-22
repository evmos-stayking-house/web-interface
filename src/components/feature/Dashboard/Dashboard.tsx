import s from './Dashboard.module.scss';
import useCoinPrice from '../../../hooks/useCoinPrice';
import { useWalletState } from '../../../contexts/WalletContext';
import useDashboard from './Dashboard.Service';
import { cn } from '../../../utils/style';
import { useState } from 'react';
import { numberFormat } from '../../../utils/numberFormats';
import ActivePosition from './ActivePosition';
import LiquidatedPosition from './LiquidatedPosition';

export enum PositionTab {
  Active = 'Active',
  Liquidated = 'Liquidated'
}

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<PositionTab>(PositionTab.Active);

  const { evmosBalance, address } = useWalletState();
  const { coinPrice: evmosPrice } = useCoinPrice(`evmos`);
  const { tvl, ibAtom, atomAmount } = useDashboard(address);

  function onSetSelectedTab(_selTab: PositionTab) {
    setSelectedTab(_selTab);
  }

  // console.log(ibAtom, interestRate);
  return (
    <div className={s.container}>
      {/*TVL Section*/}
      <div className={s.tvlContainer}>
        <div className={s.tvlBrief}>
          <div className={s.tvlBrief__left}>
            <p className={s.tvlBrief__title}>Total Value Locked</p>
            <p className={s.tvlBrief__description}>$ {numberFormat(tvl)}</p>
          </div>
          <div className={s.tvlBrief__right}>DeFi Pre Alpha Version</div>
        </div>
        <div className={s.tvlFooter}>
          <div className={s.tvlFooter__developedBy}>Developed by SooHo</div>
        </div>
      </div>
      {/*My Balance Section*/}
      <div className={s.myInfoContainer}>
        <div className={s.myInfoContainer__title}>My Balance</div>
        <div className={s.balanceContainer}>
          {/*  balanceBox */}
          <div className={s.balanceBox}>
            <div className={s.balanceBox__left}>
              <p className={s.balanceBox__value}>
                {numberFormat(Number(evmosBalance).toFixed(3))}
                <span className={s.balanceBox__value__unit}>EVMOS</span>
              </p>
              <p className={s.balanceBox__description}>
                ~ ${evmosPrice && numberFormat((evmosPrice * Number(evmosBalance)).toFixed(0))}
              </p>
            </div>
            <div className={s.balanceBox__right}>
              <img className={s.balanceBox__image} src={'/img/logo/evmos.png'} />
            </div>
          </div>
          <span className={s.rowDivider} />
          <div className={s.balanceBox}>
            <div className={s.balanceBox__left}>
              <p className={s.balanceBox__value}>
                {numberFormat(ibAtom)}
                <span className={s.balanceBox__value__unit}>ibATOM</span>
              </p>
              <p className={s.balanceBox__description}>~ {numberFormat(atomAmount)} ATOM</p>
            </div>
            <div className={s.balanceBox__right}>
              <img className={s.balanceBox__image} src={'/img/common/icon-gt-balance.svg'} />
            </div>
          </div>
          <span className={s.rowDivider} />
          <div className={s.balanceBox}>
            <div className={s.balanceBox__left}>
              <p className={s.balanceBox__value}>
                0<span className={s.balanceBox__value__unit}>uEVMOS</span>
              </p>
              <p className={s.balanceBox__description}>~ 0 EVMOS</p>
            </div>
            <div className={s.balanceBox__right}>
              <img className={s.balanceBox__image} src={'/img/common/icon-gt-balance.svg'} />
            </div>
          </div>
        </div>
      </div>
      {/*My Positions*/}
      <div className={s.myPositionContainer}>
        <span className={s.myPositionContainer__title}>My Positions</span>
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
