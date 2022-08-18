import { BigNumber, ethers } from 'ethers';

export const bigNumToStr = (bigNum: BigNumber) => {
  return bigNum.toString();
}

export const bigNumToNum = (bigNum: BigNumber) => {
  return bigNum.toNumber();
}
