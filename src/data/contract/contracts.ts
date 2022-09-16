import { Stayking, Vault, ERC20, UnbondedEvmos, MockSwap } from './abis';
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
  },
  MockSwap: {
    address: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    abi: MockSwap
  }
};

const TEST_NET_CONTRACTS = {
  stayKing: {
    address: '0x5c16AD45ec86A50a59b4fe7d9B205aCa2100de2f',
    abi: Stayking
  },
  vault: {
    address: '0xa6c036c12b65703Bd7C0e4F42Dc0E75f74675C64',
    abi: Vault
  },
  tATOM: {
    address: '0x7E6173E373308023d1B06ad43edeB165E229eE97',
    abi: ERC20
  },
  tUSDC: {
    address: '0x9218b75D53612212137890354B1a16163Abb9DE3',
    abi: ERC20
  },
  tUSDT: {
    address: '0xDAc762E9c729704784986F939585a6A628394292',
    abi: ERC20
  },
  uEVMOS: {
    address: '0xedB25Fee105C80Ab43235e016962ffd29Fe616bC',
    abi: UnbondedEvmos
  },
  MockSwap: {
    address: '0x08Be1FDf4A512fc6caA7aE1Be029b922d05EA5B3',
    abi: MockSwap
  }
};

export const contractsInfo = APP_ENV === 'local' ? LOCAL_NET_CONTRACTS : TEST_NET_CONTRACTS;
