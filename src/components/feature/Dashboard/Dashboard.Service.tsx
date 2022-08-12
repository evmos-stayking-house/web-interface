import { ReactNode, useState } from 'react';
import { ethers } from 'ethers';

const useDashboard = () => {
  const [balance, setBalance] = useState('0.0');
  const [address, setAddress] = useState<string>('');

  // const { openModal, renderModal } = useModal({
  //   content: (
  //     <BridgeResult
  //       getStatus={() => bridgeStatus}
  //       result={{
  //         sourceChain: selectedChain!,
  //         targetChain: selectedTargetChain!,
  //         symbol: selectedToken?.symbol!,
  //         amount: amount!,
  //         fee: fee.toString()
  //       }}
  //     />
  //   )
  // });

  // function actionBridge() {
  //   if (!amount) {
  //     alert('amount 입력');
  //     return;
  //   }
  //
  //   getContract(Contracts.token).approve(contractsInfo.vault.address, (Number(amount) * 1e18).toString()/*, { gasLimit: ethers.utils.parseUnits('250', 'gwei'), gasPrice: ethers.utils.parseUnits('250', 'gwei') }*/)
  //   getContract(Contracts.token).on('Approval', (to, from, amount) => {
  //     openModal();
  //     console.log('=======Approval Success=======');
  //     console.log(to, amount, from);
  //     console.log('=======Vault:Lock Start=======');
  //     vault();
  //   });
  // }

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
    balance, setBalance,
    address, setAddress,
  }
};

export default useDashboard;
