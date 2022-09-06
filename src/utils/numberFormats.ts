import { BigNumber, ethers } from 'ethers';
import { formatEther } from '@ethersproject/units/src.ts';
import { BigNumberish } from '@ethersproject/bignumber';

export const bigNumToStr = (bigNum: BigNumber) => {
  return bigNum.toString();
};

export const bigNumToNum = (bigNum: BigNumber) => {
  return bigNum.toNumber();
};

export const convertDenomFrom = (unit: string) => {
  return ethers.utils.parseEther(unit);
};

export const convertUnitFrom = (denom: string, unit?: string | BigNumberish) => {
  return ethers.utils.formatUnits(denom, unit);
};

export const numberFormat = (_num: string, fixed?: number) => {
  const num = fixed !== undefined ? Number(_num).toFixed(fixed) : Number(_num);
  const parts = num.toString().split('.');
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
};
