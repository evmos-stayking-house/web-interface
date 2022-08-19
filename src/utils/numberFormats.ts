import { BigNumber, ethers } from 'ethers';
import { formatEther } from '@ethersproject/units/src.ts';
import { BigNumberish } from '@ethersproject/bignumber';

export const bigNumToStr = (bigNum: BigNumber) => {
  return bigNum.toString();
}

export const bigNumToNum = (bigNum: BigNumber) => {
  return bigNum.toNumber();
}

export const convertDenomFrom = (unit: string) => {
  return ethers.utils.parseEther(unit);
}

export const convertUnitFrom = (denom: string, unit?: string | BigNumberish) => {
  return ethers.utils.formatUnits(denom, unit);
}
