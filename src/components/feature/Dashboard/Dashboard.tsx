import Image from 'next/image';

import MetaMask from '../../common/MetaMask';
import s from './Dashboard.module.scss';
import useDashboard from './Dashboard.Service';


const Dashboard = () => {

  const {setBalance, setAddress} = useDashboard();
  return (
    <div className={s.container}>
      <header>
        <div>
          <Image src="/img/logo/logo_icon.svg" alt="sooho.io" width={36} height={36}/>
          <span className={s.logoTextWrapper}>
              <span className={s.logoText}>Evmos StayKing House</span>
            </span>
        </div>
        <MetaMask changeBalance={setBalance} changeAddress={setAddress}/>
      </header>
    </div>
  );
}

export default Dashboard;
