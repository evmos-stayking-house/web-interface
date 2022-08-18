import { Contract } from 'ethers';

export enum Contracts {
  stayKing = 'stayKing',
  vault = 'vault',
  tATOM = 'tATOM'
}

export interface ContractsType {
  [key: string]: Contract
}
