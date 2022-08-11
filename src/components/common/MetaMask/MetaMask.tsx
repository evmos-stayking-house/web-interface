import type { FC } from 'react';
import { cn } from 'utils/style';
import useMetaMask from './MetaMast.service';
import s from './MetaMask.module.scss';

interface MetaMaskProps {
  changeAddress: Function;
  changeBalance: Function;
}

const MetaMask: FC<MetaMaskProps> = ({ changeBalance, changeAddress }) => {
  const { address, connectWallet } = useMetaMask(changeBalance, changeAddress);

  return (
    <div>
      <div className={cn(s.btn, { [s.notConnected]: !address })} onClick={connectWallet}>
        <span>{address || 'Connect Wallet First'}</span>
      </div>
      {!address && <div className={s.dim} />}
    </div>
  );
};

export default MetaMask;
