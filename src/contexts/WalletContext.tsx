import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { IThemeContext, IWalletContext, Props } from './interfaces';

const defaultContext: IWalletContext = {
  address: '',
  onChangeAddress: (_newAddress: string) => {},
};

const WalletContext = React.createContext<IWalletContext>(defaultContext);

export const WalletContextProvider: React.FC<Props> = ({ children }) => {
  const [address, setAddress] = useState<string>('');

  function onChangeAddress(_newAddress: string) {
    if(!_newAddress) return;
    setAddress(_newAddress);
    localStorage.setItem('address', _newAddress);
  }

  useEffect(() => {
    localStorage.getItem('address') && setAddress(localStorage.getItem('address')!);
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, onChangeAddress }}
    >
        {children}
    </WalletContext.Provider>
  );
};

export const useWalletState = (): IWalletContext => {
  return useContext(WalletContext);
};

