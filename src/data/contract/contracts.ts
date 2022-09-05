import { Stayking, Vault, ERC20, UnbondedEvmos } from './abis';
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
  },
  uEVMOS: {
    address: '0xAac00246CbE4D58BE99E59F59455Dc31C75A32f4',
    abi: UnbondedEvmos
  }
};

const TEST_NET_CONTRACTS = {
  stayKing: {
    address: '0x37C7e2F4B0a299BF4437dc4c8C8A80436C1aeA44',
    abi: Stayking
  },
  vault: {
    address: '0x58621A8529cA0Fcdc569F7B97690ae918C96067E',
    abi: Vault
  },
  tATOM: {
    address: '0x7E6173E373308023d1B06ad43edeB165E229eE97',
    abi: ERC20
  },
  tUSDC: {
    address: '0x55f83322529a218ba82b56A532F7B1771B9EBA96',
    abi: ERC20
  },
  tUSDT: {
    address: '0xDAc762E9c729704784986F939585a6A628394292',
    abi: ERC20
  },
  uEVMOS: {
    address: '0x7C396906079626192A266bB927E7E6706b3c7eD1',
    abi: UnbondedEvmos
  }
};

export const contractsInfo = APP_ENV === 'local' ? LOCAL_NET_CONTRACTS : TEST_NET_CONTRACTS;
