import { Stayking, Vault, ERC20 } from './abis';
import { APP_ENV } from '../../config/environments';

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

const LOCAL_NET_CONTRACTS = {
  stayKing: {
    address: '0xfE32C16436587f26D4E90F0AB3698480316d8753',
    abi: Stayking
  },
  vault: {
    address: '0x42504f053d05D68Af721081221Aa6dB18422C6b1',
    abi: Vault
  },
  tATOM: {
    address: '0x7E6173E373308023d1B06ad43edeB165E229eE97',
    abi: ERC20
  },
  tUSDC: {
    address: '0x07582D65d6739AE74B0B5264AF6c2bc6AA5FEE03',
    abi: ERC20
  },
  tUSDT: {
    address: '0xDAc762E9c729704784986F939585a6A628394292',
    abi: ERC20
  }
};

export const contractsInfo = APP_ENV === 'local' ? LOCAL_NET_CONTRACTS : TEST_NET_CONTRACTS;
