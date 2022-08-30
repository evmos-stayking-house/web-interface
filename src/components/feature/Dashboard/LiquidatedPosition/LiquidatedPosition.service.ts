import { useEffect, useState } from 'react';
import { getContract } from '../../../../config/contract';
import { Contracts } from '../../../../type/contract';
import { Contract } from 'ethers';
import { useWalletState } from '../../../../contexts/WalletContext';
import { APP_ENV } from '../../../../config/environments';

let stayKingContract: Contract;
let vaultContract: Contract;

const useActivePosition = () => {
  const { address } = useWalletState();
  const [liquidatedTxs, setLiquidatedTxs] = useState<any[]>([]);

  async function getKillFilter() {
    const filterFrom = stayKingContract.filters['RemovePosition'](address);
    return stayKingContract.queryFilter(filterFrom, APP_ENV === 'local' ? -10 : 5203485, 'latest');
  }

  async function init() {
    const data = await getKillFilter();
    console.log(data);
    setLiquidatedTxs(data);
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
