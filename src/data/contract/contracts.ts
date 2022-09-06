import { Stayking, Vault, ERC20, UnbondedEvmos } from './abis';
import { APP_ENV } from '../../config/environments';

const LOCAL_NET_CONTRACTS = {
  stayKing: {
    address: '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
    abi: Stayking
  },
  vault: {
    address: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
    abi: Vault
  },
  tATOM: {
    address: '0x18144Dc4b29a59B5E57c7273B0764138e50e4836',
    abi: ERC20
  },
  tUSDC: {
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    abi: ERC20
  },
  tUSDT: {
    address: '0xd31855C7D6b7212bc911Cb2543ea77Bb232d428f',
    abi: ERC20
  },
  uEVMOS: {
    address: '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
    abi: UnbondedEvmos
  }
};

const TEST_NET_CONTRACTS = {
  stayKing: {
    address: '0x14CB3b1a9F343B7F75F6Fb085Df2b210dEbA38f4',
    abi: Stayking
  },
  vault: {
    address: '0x1165fB4616AEBa68D9bD928811bBd5338b3eA6F1',
    abi: Vault
  },
  tATOM: {
    address: '0x7E6173E373308023d1B06ad43edeB165E229eE97',
    abi: ERC20
  },
  tUSDC: {
    address: '0x76CC610c589D05CccCe832025576EA7B2484683C',
    abi: ERC20
  },
  tUSDT: {
    address: '0xDAc762E9c729704784986F939585a6A628394292',
    abi: ERC20
  },
  uEVMOS: {
    address: '0x16B93cccC0e6E8C52a21433e947eE6894e57Ef07',
    abi: UnbondedEvmos
  }
};

export const contractsInfo = APP_ENV === 'local' ? LOCAL_NET_CONTRACTS : TEST_NET_CONTRACTS;
