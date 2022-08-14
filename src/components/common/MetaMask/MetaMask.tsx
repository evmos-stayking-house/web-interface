import type { FC } from 'react';
import { cn } from 'utils/style';
import useMetaMask from './MetaMast.service';
import s from './MetaMask.module.scss';
import { useWalletState } from '../../../contexts/WalletContext';

interface MetaMaskProps {}

const MetaMask: FC<MetaMaskProps> = () => {
  const { address } = useWalletState();
  const { connectWallet } = useMetaMask();
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
