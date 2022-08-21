import Image from 'next/image';

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
