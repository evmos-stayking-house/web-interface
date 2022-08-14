import s from './Dashboard.module.scss';
import useCoinPrice from '../../../hooks/useCoinPrice';
import { useWalletState } from '../../../contexts/WalletContext';

const Dashboard = () => {
  const { evmosBalance } = useWalletState();
  const { coinPrice: evmosPrice } = useCoinPrice(`evmos`);

  return (
    <div className={s.container}>
      <div className={s.tvlContainer}>
        <div className={s.tvlBrief}>
          <div className={s.tvlBrief__left}>
            <p className={s.tvlBrief__title}>Total Value Locked</p>
            <p className={s.tvlBrief__description}>
              $ 105,122,779.73
            </p>
          </div>
          <div className={s.tvlBrief__right}>
            DeFi Pre Alpha Version
          </div>
        </div>
        <div className={s.tvlFooter}>
          <div className={s.tvlFooter__developedBy}>
            Developed by Sooho
          </div>
        </div>
      </div>
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
                100 ibATOM
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
    </div>
  );
}

export default Dashboard;
