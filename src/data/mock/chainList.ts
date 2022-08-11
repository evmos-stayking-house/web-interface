export const CHAIN_LIST = [
  {
    id: 'ethereum',
    img: '/img/chains/ethereum.svg',
    name: 'Ethereum'
  },
  {
    id: 'bnb_smart',
    img: '/img/chains/bnb_smart.svg',
    name: 'BNB'
  },
  {
    id: 'xrp',
    img: '/img/chains/xrp.svg',
    name: 'XRP'
  },
  {
    id: 'usd',
    img: '/img/chains/usd.svg',
    name: 'USD Coin'
  },
  {
    id: 'klaytn',
    img: '/img/chains/klaytn.svg',
    name: 'Klaytn'
  },
  {
    id: 'ethereum1',
    img: '/img/chains/ethereum.svg',
    name: 'Ethereum'
  },
  {
    id: 'bnb1',
    img: '/img/chains/bnb.svg',
    name: 'BNB'
  },
  {
    id: 'xrp1',
    img: '/img/chains/xrp.svg',
    name: 'XRP'
  },
  {
    id: 'usd1',
    img: '/img/chains/usd.svg',
    name: 'USD Coin'
  },
  {
    id: 'klaytn1',
    img: '/img/chains/klaytn.svg',
    name: 'Klaytn'
  }
];

interface chainInfoType {
  [name: string]: {
    img: string;
    name: string;
  };
}

export const CHAIN_INFO: chainInfoType = {
  bnb_smart: {
    img: '/img/chains/bnb_smart.svg',
    name: 'BNB'
  },
  klaytn: {
    img: '/img/chains/klaytn.svg',
    name: 'Klaytn'
  },
  USDT: {
    img: '/img/chains/usd.svg',
    name: 'USDT'
  },
  klaytn_baobab: {
    img: '/img/chains/usd.svg',
    name: 'klaytn_baobab'
  },
  sUSDT: {
    img: '/img/chains/usd.svg',
    name: 'sUSDT'
  },
  WEMIX: {
    img: '/img/chains/xrp.svg',
    name: 'WEMIX'
  },
  sWEMIX: {
    img: '/img/chains/xrp.svg',
    name: 'sWEMIX'
  },
  TOriginal: {
    img: '/img/chains/xrp.svg',
    name: 'TOriginal'
  },
  'melted testA': {
    img: '/img/chains/xrp.svg',
    name: 'melted testA'
  },
};
