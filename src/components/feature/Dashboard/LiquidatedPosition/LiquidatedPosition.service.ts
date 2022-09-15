import { useEffect, useState } from 'react';
import { getContract, getProvider } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract, ethers } from 'ethers';
import { useWalletState } from '../../../../contexts/WalletContext';
import { APP_ENV } from '../../../../config/environments';
import { convertDenomFrom, convertUnitFrom } from '../../../../utils/numberFormats';

let stayKingContract: Contract;
let vaultContract: Contract;

export interface KillEvent {
  positionValue?: number;
  debtRatio?: number;
  safetyBuffer?: number;
  killer: string;
  user: string;
  vault: string;
  share: number;
  equity: number;
  debtInBase: number;
  debt: number;
  returnAmount: number;
}

const defaultKillEvent: KillEvent = {
  positionValue: 0,
  debtRatio: 0,
  safetyBuffer: 0,
  debt: 0,
  debtInBase: 0,
  equity: 0,
  killer: '',
  share: 0,
  user: '',
  vault: '',
  returnAmount: 0
};

const useActivePosition = () => {
  const { address } = useWalletState();
  const [liquidatedTxs, setLiquidatedTxs] = useState<KillEvent[]>([]);

  async function getKillFilter(): Promise<Array<any>> {
    const _blockHeight = await getProvider().getBlockNumber();
    const filterFrom = stayKingContract.filters['Kill'](`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`, address);
    return stayKingContract.queryFilter(filterFrom, APP_ENV === 'local' ? -10 : _blockHeight - 9900, 'latest');
  }

  async function init() {
    const events = await getKillFilter();
    let _liquidatedTxs: KillEvent[] = [];
    for (let idx = 0; idx < events.length; idx++) {
      console.log(events[idx]);
      let { killer, user, vault, share, equity, debtInBase, debt } = events[idx].args || defaultKillEvent;
      share = Number(convertUnitFrom(share, '18'));
      equity = Number(convertUnitFrom(equity, '18'));
      debtInBase = Number(convertUnitFrom(debtInBase, '18'));
      const positionValue = equity + debtInBase;
      const _deptInBase = await vaultContract.getBaseIn(convertDenomFrom(convertUnitFrom(debt)));
      const fee = (equity + debtInBase) * 0.05;
      const currentDebtInBase = Number(convertUnitFrom(_deptInBase, '18'));
      const returnAmount = positionValue - fee - currentDebtInBase;
      _liquidatedTxs.push({
        vault,
        killer,
        user,
        share,
        equity,
        debtInBase,
        debt,
        debtRatio: (debtInBase / (debtInBase + equity)) * 100,
        safetyBuffer: 100 - (debtInBase / (debtInBase + equity)) * 100,
        returnAmount: returnAmount,
        positionValue: equity + debtInBase
      });
    }
    setLiquidatedTxs(_liquidatedTxs);
  }

  async function getReceipt(txHash: string) {
    return getProvider().getTransactionReceipt(txHash);
  }

  useEffect(() => {
    stayKingContract = getContract(Contracts.stayKing);
    vaultContract = getContract(Contracts.vault);
  }, []);

  useEffect(() => {
    (async (_address) => {
      _address && (await init());
    })(address);
  }, [address]);

  return {
    liquidatedTxs
  };
};

export default useActivePosition;
