import type { FC } from 'react';
import { cn } from 'utils/style';
import s from './MetaMask.module.scss';
import { useWalletState } from '../../../contexts/WalletContext';
import { useModal } from '../../Modal';
import WalletSelection from '../../Modal/ModalContents/WalletSelection/WalletSelection';
import useMetaMask from './MetaMask.service';

interface MetaMaskProps {}

const MetaMask: FC<MetaMaskProps> = () => {
  const { address } = useWalletState();
  const { connectWallet } = useMetaMask();
  const { openModal, closeModal, renderModal } = useModal({
    content: <WalletSelection closeModal={() => closeModal()} metaMaskLogin={connectWallet} />
  });
  // connectWallet
  return (
    <div>
      <div
        className={cn(s.btn, { [s.notConnected]: !address })}
        onClick={() => (address ? connectWallet() : openModal())}>
        <span>{address || 'Connect Wallet First'}</span>
      </div>
      {!address && <div className={s.dim} />}
      {renderModal()}
    </div>
  );
};

export default MetaMask;
