import React, { useState, useEffect, useContext } from 'react';
import { IWalletContext, Props } from './interfaces';

const defaultContext: IWalletContext = {
  address: '',
  onChangeAddress: (_newAddress: string) => {},
  onChangeEvmosBalance: (_evmosBalance: string) => {},
  evmosBalance: '0.0',
  isPending: false,
  onChangeIsPendingState: (_isPending: boolean) => {}
};

const WalletContext = React.createContext<IWalletContext>(defaultContext);

export const WalletContextProvider: React.FC<Props> = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [evmosBalance, setEvmosBalance] = useState<string>('0.0');
  const [isPending, setIsPending] = useState<boolean>(false);

  function onChangeAddress(_newAddress: string) {
    setAddress(_newAddress);
    if (_newAddress) localStorage.setItem('address', _newAddress);
    else {
      localStorage.removeItem('address');
      setEvmosBalance('0.0');
    }
  }

  function onChangeIsPendingState(_isPending: boolean) {
    setIsPending(_isPending);
  }

  function onChangeEvmosBalance(_evmosBalance: string) {
    setEvmosBalance(_evmosBalance);
  }

  useEffect(() => {
    localStorage.getItem('address') && setAddress(localStorage.getItem('address')!);
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, onChangeAddress, evmosBalance, onChangeEvmosBalance, isPending, onChangeIsPendingState }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletState = (): IWalletContext => {
  return useContext(WalletContext);
};
