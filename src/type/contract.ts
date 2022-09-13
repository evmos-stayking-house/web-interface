import { Contract } from 'ethers';

export enum Contracts {
  stayKing = 'stayKing',
  vault = 'vault',
  tATOM = 'tATOM',
  tUSDC = 'tUSDC',
  tUSDT = 'tUSDT',
  uEVMOS = 'uEVMOS',
  MockSwap = 'MockSwap'
}

export interface ContractsType {
  [key: string]: Contract;
}
