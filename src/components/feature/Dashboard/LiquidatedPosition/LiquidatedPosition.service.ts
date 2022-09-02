import { useEffect, useState } from 'react';
import { getContract, getProvider } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract, ethers } from 'ethers';
import { useWalletState } from '../../../../contexts/WalletContext';
import { APP_ENV } from '../../../../config/environments';
import { convertUnitFrom } from '../../../../utils/numberFormats';

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
  vault: ''
};

const useActivePosition = () => {
  const { address } = useWalletState();
  const [liquidatedTxs, setLiquidatedTxs] = useState<KillEvent[]>([]);

  async function getKillFilter() {
    const filterFrom = stayKingContract.filters['Kill'](address);
    return stayKingContract.queryFilter(filterFrom, APP_ENV === 'local' ? -10 : 5203485, 'latest');
  }

  async function init() {
    const events = await getKillFilter();
    const liquidatedTxs = events.map(({ args }): KillEvent => {
      let { killer, user, vault, share, equity, debtInBase, debt } = args || defaultKillEvent;

      share = Number(convertUnitFrom(share, '18'));
      equity = Number(convertUnitFrom(equity, '18'));
      debtInBase = Number(convertUnitFrom(debtInBase, '18'));
      debt = Number(convertUnitFrom(debt, '18'));

      return {
        vault,
        killer,
        user,
        share,
        equity,
        debtInBase,
        debt,
        debtRatio: (debtInBase / (debtInBase + equity)) * 100,
        safetyBuffer: 100 - (debtInBase / (debtInBase + equity)) * 100,
        positionValue: equity + debtInBase
      };
    });

    console.log(liquidatedTxs);
    setLiquidatedTxs(liquidatedTxs);
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
