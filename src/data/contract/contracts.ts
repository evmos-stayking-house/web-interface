import abi from './deployed_abi.json';

export const contractsInfo = {
  token: {
    address: '0xF3FB839b708B596f9A02339369eA1A7C7D05448F',
    abi: abi.ERC20
  },
  vault: {
    address: '0x708f1954CDb038102BB044c27bd32B8cC09De187',
    abi: abi.Vault
  },
  melter: {
    address: '0xaE8235c252829514a8135F2CB96Af6e53B6509c4',
    abi: abi.Melter
  },
}