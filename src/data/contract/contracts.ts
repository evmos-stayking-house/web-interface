import { Stayking, Vault, ERC20 } from './abis';

export const contractsInfo = {
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
