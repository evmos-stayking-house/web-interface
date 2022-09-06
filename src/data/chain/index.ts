export const chains = [
  {
    chainId: '0x2328',
    chainName: 'Evmos - Testnet',
    nativeCurrency: {
      name: 'tEVMOS',
      symbol: 'tEVMOS', // 2-6 characters long
      decimals: 18
    },
    blockExplorerUrls: ['https://evm.evmos.dev'],
    rpcUrls: ['https://eth.bd.evmos.dev:8545']
  },
  {
    chainId: '0x7a69',
    chainName: 'Evmos - Local Testnet',
    nativeCurrency: {
      name: 'tEVMOS',
      symbol: 'tEVMOS', // 2-6 characters long
      decimals: 18
    },
    blockExplorerUrls: [''],
    rpcUrls: ['http://127.0.0.1:8545']
  }
];
