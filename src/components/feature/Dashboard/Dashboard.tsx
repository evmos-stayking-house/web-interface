import s from './Dashboard.module.scss';

const Dashboard = () => {
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
    </div>
  );
}

export default Dashboard;
