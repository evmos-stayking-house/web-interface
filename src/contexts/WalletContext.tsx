import React, { useState, useEffect, useContext } from 'react';
import { IWalletContext, Props } from './interfaces';

const defaultContext: IWalletContext = {
  address: '',
  onChangeAddress: (_newAddress: string) => {},
  onChangeEvmosBalance: (_evmosBalance: string) => {},
  evmosBalance: '0.0'
};

const WalletContext = React.createContext<IWalletContext>(defaultContext);

export const WalletContextProvider: React.FC<Props> = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [evmosBalance, setEvmosBalance] = useState<string>('0.0');

  function onChangeAddress(_newAddress: string) {
    if(!_newAddress) return;
    setAddress(_newAddress);
    localStorage.setItem('address', _newAddress);
  }

  function onChangeEvmosBalance(_evmosBalance: string) {
    setEvmosBalance(_evmosBalance);
  }

  useEffect(() => {
    localStorage.getItem('address') && setAddress(localStorage.getItem('address')!);
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, onChangeAddress, evmosBalance, onChangeEvmosBalance }}
    >
        {children}
    </WalletContext.Provider>
  );
};

export const useWalletState = (): IWalletContext => {
  return useContext(WalletContext);
};

