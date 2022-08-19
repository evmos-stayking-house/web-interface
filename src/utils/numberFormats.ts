import { BigNumber, ethers } from 'ethers';
import { formatEther } from '@ethersproject/units/src.ts';

export const bigNumToStr = (bigNum: BigNumber) => {
  return bigNum.toString();
}

export const bigNumToNum = (bigNum: BigNumber) => {
  return bigNum.toNumber();
}

export const convertDenomFrom = (unit: string) => {
  return ethers.utils.parseEther(unit);
}

export const convertUnitFrom = (denom: string) => {
  return ethers.utils.formatEther(denom);
}
