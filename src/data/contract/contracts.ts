import { Stayking, Vault, ERC20 } from './abis';
import { APP_ENV } from '../../config/environments';

const LOCAL_NET_CONTRACTS = {
  stayKing: {
    address: '0x726debadDCd0A372ae74A94e4c964d0253167c48',
    abi: Stayking
  },
  vault: {
    address: '0xF1e004B20C02e106dc6567eeB7c52EF9e17dC087',
    abi: Vault
  },
  tATOM: {
    address: '0x18144Dc4b29a59B5E57c7273B0764138e50e4836',
    abi: ERC20
  },
  tUSDC: {
    address: '0x3fFc9A40369696778c1cDDD245F5409857C90881',
    abi: ERC20
  },
  tUSDT: {
    address: '0xd31855C7D6b7212bc911Cb2543ea77Bb232d428f',
    abi: ERC20
  }
};

const TEST_NET_CONTRACTS = {
  stayKing: {
    address: '0xd8A9159c111D0597AD1b475b8d7e5A217a1d1d05',
    abi: Stayking
  },
  vault: {
    address: '0xAE246E208ea35B3F23dE72b697D47044FC594D5F',
    abi: Vault
  },
  tATOM: {
    address: '0x7E6173E373308023d1B06ad43edeB165E229eE97',
    abi: ERC20
  },
  tUSDC: {
    address: '0x575D3d18666B28680255a202fB5d482D1949bB32',
    abi: ERC20
  },
  tUSDT: {
    address: '0xDAc762E9c729704784986F939585a6A628394292',
    abi: ERC20
  }
};

export const contractsInfo = APP_ENV === 'local' ? LOCAL_NET_CONTRACTS : TEST_NET_CONTRACTS;
