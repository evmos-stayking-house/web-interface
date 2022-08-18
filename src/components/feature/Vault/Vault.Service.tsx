import { ReactNode, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import useSWR from 'swr';

import { contractsInfo } from 'data/contract/contracts';
import { getContract } from 'config/contract';
import { fetcher } from 'utils/fetcher';
import { Contracts } from 'type/contract';
import { BridgeStatus } from 'type/bridge';
import { BridgeResult, useModal } from 'components/Modal';
import { calculateFee, getChainInfo, getTokenList } from './utils';

interface ListItemType {
  key: string;
  item: ReactNode;
}

interface tokenItemType extends ListItemType {
  objectId: string;
  symbol: string;
  address: string;
  type: string;
  melter: string;
  vault: string;
  partnerObjectId: string;
  feeDecimal: number;
  fee: number;
}

const useVault = () => {
  const [chainList, setChainList] = useState<ListItemType[]>();
  const [tokenList, setTokenList] = useState<ListItemType[]>();
  const [balance, setBalance] = useState('0.0');
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>();
  const [selectedChain, setSelectedChain] = useState<string>();
  const [selectedTargetChain, setSelectedTargetChain] = useState<string>();
  const [selectedToken, setSelectedToken] = useState<tokenItemType>();
  const [fee, setFee] = useState(0);
  const [bridgeStatus, setBridgeStatus] = useState(BridgeStatus.yet);
  const { data } = useSWR('/api/config', fetcher);

  useEffect(() => {
    data && setChainList(getChainInfo(data.data.chains));
  }, [data]);

  useEffect(() => {
    chainList && setTokenList(getTokenList(data.data.tokens, selectedChain));
  }, [chainList, selectedChain]);

  useEffect(() => {
    if (selectedToken) {
      const { fee, feeDecimal } = selectedToken;
      setFee(calculateFee(Number(amount), Number(fee), Number(feeDecimal)));
    }
  }, [selectedToken, amount]);

  const { openModal, renderModal } = useModal({
    content: (
      <BridgeResult
        getStatus={() => bridgeStatus}
        result={{
          sourceChain: selectedChain!,
          targetChain: selectedTargetChain!,
          symbol: selectedToken?.symbol!,
          amount: amount!,
          fee: fee.toString()
        }}
      />
    )
  });

  // function actionBridge() {
  //   if (!amount) {
  //     alert('amount 입력');
  //     return;
  //   }
  //
  //   getContract(Contracts.tATOM).approve(contractsInfo.vault.address, (Number(amount) * 1e18).toString()/*, { gasLimit: ethers.utils.parseUnits('250', 'gwei'), gasPrice: ethers.utils.parseUnits('250', 'gwei') }*/)
  //   getContract(Contracts.tATOM).on('Approval', (to, from, amount) => {
  //     openModal();
  //     console.log('=======Approval Success=======');
  //     console.log(to, amount, from);
  //     console.log('=======Vault:Lock Start=======');
  //     vault();
  //   });
  // }
  //
  // function vault() {
  //   getContract(Contracts.vault).lock((Number(amount) * 1e18).toString(), ethers.utils.formatBytes32String(selectedChain!), address, {
  //     gasLimit: ethers.utils.parseUnits('250', 'gwei'),
  //     gasPrice: ethers.utils.parseUnits('250', 'gwei')
  //   })
  //
  //   getContract(Contracts.vault).on('Lock', (...args) => {
  //     setBridgeStatus(BridgeStatus.complete);
  //     console.log('=======Lock Success=======');
  //     console.log(args)
  //   })
  //
  //   getContract(Contracts.melter).on('Mint', (...args) => {
  //     console.log('=======Mint Success=======');
  //     console.log(args)
  //   })
  // }

  return {
    // chainList, tokenList, fee,
    balance, setBalance,
    address, setAddress,
    // amount, setAmount,
    // selectedChain, setSelectedChain,
    // selectedTargetChain, setSelectedTargetChain,
    // selectedToken, setSelectedToken,
    // actionBridge,
    // renderModal
  }
};

export default useVault;
