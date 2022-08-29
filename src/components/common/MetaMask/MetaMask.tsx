import type { FC } from 'react';
import { cn } from 'utils/style';
import s from './MetaMask.module.scss';
import useMetaMask from './MetaMask.service';

interface MetaMaskProps {}

const MetaMask: FC<MetaMaskProps> = () => {
  const { connectWallet, address, openModal, renderModal } = useMetaMask();

  return (
    <div>
      <div
        className={cn(s.btn, { [s.notConnected]: !address })}
        onClick={() => (address ? connectWallet() : openModal())}>
        <span>{address || 'Connect Wallet'}</span>
      </div>
      {!address && <div className={s.dim} />}
      {renderModal()}
    </div>
  );
};

// MetaMask.st
export default MetaMask;
