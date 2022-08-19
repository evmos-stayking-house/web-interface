import { Stayking, Vault, ERC20 } from './abis';

export const contractsInfo = {
  stayKing: {
    address: '0x7a2088a1bFc9d81c55368AE168C2C02570cB814F',
    abi: Stayking
  },
  vault: {
    address: '0xc5a5C42992dECbae36851359345FE25997F5C42d',
    abi: Vault
  },
  tATOM: {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: ERC20
  },
  tUSDC: {
    address: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    abi: ERC20
  },
  tUSDT: {
    address: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    abi: ERC20
  }
}
