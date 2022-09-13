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
    address: '0xd39656eDfB1375B5b255e5389Ae26C7AaFCbfe41',
    abi: Stayking
  },
  vault: {
    address: '0x827791C6bCEeF91C024F2DdE5280CAE778CB21CA',
    abi: Vault
  },
  tATOM: {
    address: '0x7E6173E373308023d1B06ad43edeB165E229eE97',
    abi: ERC20
  },
  tUSDC: {
    address: '0xF41895aE695b57CddB8625a56DD1daf0986d414E',
    abi: ERC20
  },
  tUSDT: {
    address: '0xDAc762E9c729704784986F939585a6A628394292',
    abi: ERC20
  },
  uEVMOS: {
    address: '0x78b6538835C630c295125367F92303d13E08DfeD',
    abi: UnbondedEvmos
  },
  MockSwap: {
    address: '0x35A6612A26Fe4FFdEDf9b356c6a2Eb8Dee3Fb91e',
    abi: MockSwap
  }
};

export const contractsInfo = APP_ENV === 'local' ? LOCAL_NET_CONTRACTS : TEST_NET_CONTRACTS;
