import { Contract } from 'ethers';

export enum Contracts {
  token = 'token',
  vault = 'vault',
  melter = 'melter'
}

export interface ContractsType {
  [key: string]: Contract
}