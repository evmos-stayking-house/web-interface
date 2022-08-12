import Image from 'next/image';
import { CHAIN_INFO } from 'data/mock/chainList';

export function calculateFee(amount: number | undefined, fee: number, feeDecimal: number) {
  if (amount === 0 || !amount) {
    return 0;
  }

  if (feeDecimal === 0) {
    return amount * fee * 0.01;
  } else {
    return fee / Math.pow(10, feeDecimal);
  }
}

interface chainType {
  chainName: string;
}

interface tokenType {
  chainName: string;
  symbol: string;
}

export function getTokenList(tokens: tokenType[], selectedChain: string | undefined) {
  return tokens
    .filter((el) => el.chainName === selectedChain)
    .map((el) => {
      return {
        key: el.symbol,
        item: (
          <>
            <Image src={CHAIN_INFO[el.symbol].img} alt={el.symbol} width={24} height={24}/>
            <span>{CHAIN_INFO[el.symbol].name}</span>
          </>
        ),
        ...el
      };
    });
}

export function getChainInfo(chainList: chainType[]) {
  return chainList.map(({ chainName }) => ({
    key: chainName,
    item: (
      <>
        <Image src={CHAIN_INFO[chainName].img} alt={chainName} width={24} height={24}/>
        <span>{CHAIN_INFO[chainName].name}</span>
      </>
    )
  }));
}