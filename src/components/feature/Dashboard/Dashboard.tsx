import s from './Dashboard.module.scss';
import useCoinPrice from '../../../hooks/useCoinPrice';
import { useWalletState } from '../../../contexts/WalletContext';
import useDashboard from './Dashboard.Service';
import { cn } from '../../../utils/style';
import { useState } from 'react';

export enum PositionTab {
  Active = 'Active',
  Liquidated = 'Liquidated',
}

const Dashboard = () => {

  const [selectedTab, setSelectedTab] = useState<PositionTab>(PositionTab.Active);

  const { evmosBalance, address } = useWalletState();
  const { coinPrice: evmosPrice } = useCoinPrice(`evmos`);
  const { ibAtom, interestRate } = useDashboard(address);

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
            <p className={s.tvlBrief__description}>
              $ 105,122
            </p>
          </div>
          <div className={s.tvlBrief__right}>
            DeFi Pre Alpha Version
          </div>
        </div>
        <div className={s.tvlFooter}>
          <div className={s.tvlFooter__developedBy}>
            Developed by SooHo
          </div>
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
                {Number(evmosBalance).toFixed(4)} EVMOS
              </p>
              <p className={s.balanceBox__description}>
                ~ ${evmosPrice && (evmosPrice * Number(evmosBalance)).toFixed(2)}
              </p>
            </div>
            <div className={s.balanceBox__right}>
              <img className={s.balanceBox__image} src={'/img/common/icon-gt-balance.svg'} />
            </div>
          </div>
          <span className={s.rowDivider} />
          <div className={s.balanceBox}>
            <div className={s.balanceBox__left}>
              <p className={s.balanceBox__value}>
                {ibAtom} ibATOM
              </p>
              <p className={s.balanceBox__description}>
                ~ 135 ATOM
              </p>
            </div>
            <div className={s.balanceBox__right}>
              <img className={s.balanceBox__image} src={'/img/common/icon-gt-balance.svg'} />
            </div>
          </div>
          <span className={s.rowDivider} />
          <div className={s.balanceBox}>
            <div className={s.balanceBox__left}>
              <p className={s.balanceBox__value}>
                200 stEVMOS
              </p>
              <p className={s.balanceBox__description}>
                ~ 310 EVMOS
              </p>
            </div>
            <div className={s.balanceBox__right}>
              <img className={s.balanceBox__image} src={'/img/common/icon-gt-balance.svg'} />
            </div>
          </div>
        </div>
      </div>
      {/*My Positions*/}
      <div className={s.myPositionContainer}>
        <span className={s.myPositionContainer__title}>
          My Positions
        </span>
        <div className={s.tabsContainer}>
          <div className={cn(s.tab, { [s.activeTab]: selectedTab === PositionTab.Active})} onClick={() => onSetSelectedTab(PositionTab.Active)}>
            <span className={s.label}>Active Positions</span>
          </div>
          <div className={cn(s.tab, { [s.activeTab]: selectedTab === PositionTab.Liquidated} )} onClick={() => onSetSelectedTab(PositionTab.Liquidated)}>
            <span className={s.label}>Liquidated Positions</span>
          </div>
        </div>
        <div className={s.positionContainerHeader}>
          <div>Pool</div>
          <div className={s.alignToCenter}>Position<br/>Value</div>
          <div className={s.alignToCenter}>Dept<br/>Value</div>
          <div className={s.alignToCenter}>Equity<br/>Value</div>
          <div className={s.alignToCenter}>Current<br/>APY</div>
          <div className={s.alignToCenter}>Dept<br/>Ratio</div>
          <div className={s.alignToCenter}>Liquidation<br/>Threshold</div>
          <div className={s.alignToCenter}>Safety<br/>Buffer</div>
          <div>&nbsp;</div>
        </div>
        <div className={s.positionEmptyContainer}>
          No Active Positions
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
