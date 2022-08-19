import { ethers,  } from 'ethers';
import { Contracts, ContractsType } from 'type/contract';
import { contractsInfo } from '../data/contract/contracts';
import { chains } from '../data/chain';

let contract: ContractsType = {};
let provider: ethers.providers.Web3Provider | null = null;


export function initMetaMaskProvider() {
  return new ethers.providers.Web3Provider(window.ethereum);
}

export function getProvider() {
  return provider || initMetaMaskProvider();
}

export async function switchEvmosChain() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chains[1].chainId }],
    });
  } catch (e: any) {
    if (e.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            chains[1]
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
  }
}

export function getContract(contractName: Contracts) {
  const signer = getProvider().getSigner()
  return new ethers.Contract(contractsInfo[contractName].address, contractsInfo[contractName].abi, signer);
}
