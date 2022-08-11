import { ethers,  } from 'ethers';
import { Contracts, ContractsType } from 'type/contract';
import { contractsInfo } from 'data/contract/contracts';

let contract: ContractsType = {};
let provider: ethers.providers.Web3Provider | null = null;

export function initMetaMaskProvider() {
  provider = new ethers.providers.Web3Provider(window.ethereum)
  return provider;
}

export function getProvider() {
  return provider || initMetaMaskProvider();
}

export function getContract(contractName: Contracts) {
  if (!contract[contractName]) {
    const signer = getProvider().getSigner()
    contract[contractName] = new ethers.Contract(contractsInfo[contractName].address, contractsInfo[contractName].abi, signer);
  }

  return contract[contractName];
}