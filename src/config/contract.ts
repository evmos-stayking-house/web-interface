import { ethers } from 'ethers';
import { Contracts } from 'type/contract';
import { contractsInfo } from '../data/contract/contracts';
import { chains } from '../data/chain';
import { APP_ENV } from './environments';

let provider: ethers.providers.Web3Provider | null = null;

export function initMetaMaskProvider() {
  return new ethers.providers.Web3Provider(window.ethereum);
}

export function getProvider() {
  return provider || initMetaMaskProvider();
}

export async function switchEvmosChain() {
  const chain = APP_ENV === 'local' ? chains[1] : chains[0];
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.chainId }]
    });
  } catch (e: any) {
    if (e.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chain]
        });
      } catch (addError) {
        console.error(addError);
      }
    }
  }
}

export function getContract(contractName: Contracts) {
  const signer = getProvider().getSigner();
  return new ethers.Contract(contractsInfo[contractName].address, contractsInfo[contractName].abi, signer);
}
