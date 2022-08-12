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

export async function switchEvmosChain() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x2328' }],
    });
  } catch (e: any) {
    if (e.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x2328',
              chainName: 'Evmos - Testnet',
              nativeCurrency: {
                name: 'tEVMOS',
                symbol: 'tEVMOS', // 2-6 characters long
                decimals: 18
              },
              blockExplorerUrls: ['https://evm.evmos.dev'],
              rpcUrls: ['https://eth.bd.evmos.dev:8545'],
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
  }
}

export function getContract(contractName: Contracts) {
  if (!contract[contractName]) {
    const signer = getProvider().getSigner()
    contract[contractName] = new ethers.Contract(contractsInfo[contractName].address, contractsInfo[contractName].abi, signer);
  }

  return contract[contractName];
}
