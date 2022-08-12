import { ReactNode } from 'react';
import Image from 'next/image';

import Form from 'components/common/Form';
import Dropdown from 'components/common/Dropdown';
import { InputNumber } from 'components/common/Input';
import Button from 'components/common/Button';
import MetaMask from 'components/common/MetaMask';
import Toggle from 'components/common/Toggle';
import SectionAddress from './SectionAddress';

import s from './Vault.module.scss';
import useBridge from './Vault.Service';

interface chainItemType {
  key: string;
  item: ReactNode;
}

const Vault = () => {
  const {
    setBalance,
    setAddress,
  } = useBridge();

  return (
    <div className={s.container}>
      <header>
        <div>
          <Image src="/img/logo/logo_icon.svg" alt="sooho.io" width={36} height={36}/>
          <span className={s.logoTextWrapper}>
            <span className={s.logoText}>Evmos StayKing House</span>
          </span>
        </div>
        <MetaMask changeBalance={setBalance} changeAddress={setAddress}/>
      </header>

      <div className={s.content}>
        {/*<Form>*/}
        {/*  <section className={s.contentChain}>*/}
        {/*    <Form.Item label="From Chain">*/}
        {/*      <Dropdown*/}
        {/*        placeholder="Choose Chain"*/}
        {/*        list={chainList!}*/}
        {/*        selectedId={selectedChain}*/}
        {/*        onChange={(el: chainItemType) => setSelectedChain(el.key)}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item label="To Chain">*/}
        {/*      <Dropdown*/}
        {/*        placeholder="Choose Chain"*/}
        {/*        list={chainList!}*/}
        {/*        selectedId={selectedTargetChain}*/}
        {/*        onChange={(el: chainItemType) => setSelectedTargetChain(el.key)}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*  </section>*/}

        {/*  <section className={s.contentToken}>*/}
        {/*    <Form.Item label="Token">*/}
        {/*      {tokenList && (*/}
        {/*        <Dropdown*/}
        {/*          placeholder="Choose Token"*/}
        {/*          list={tokenList}*/}
        {/*          selectedId={selectedToken?.key}*/}
        {/*          onChange={setSelectedToken}*/}
        {/*        />*/}
        {/*      )}*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item*/}
        {/*      label="Amount"*/}
        {/*      className={s.amount}*/}
        {/*      extra={*/}
        {/*        <div>*/}
        {/*          <p className={s.balance}>*/}
        {/*            Balance <span className="bold">{balance}</span>*/}
        {/*          </p>*/}
        {/*          <p>*/}
        {/*            Fee <span className="bold">{fee}</span>*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <InputNumber*/}
        {/*        decimal={6}*/}
        {/*        placeholder="0.000000"*/}
        {/*        setInputValue={setAmount}*/}
        {/*        max={balance}*/}
        {/*        inputValue={amount}*/}
        {/*        button={*/}
        {/*          <div className={s.maxBtn} onClick={() => setAmount(balance)}>*/}
        {/*            Max*/}
        {/*          </div>*/}
        {/*        }*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*  </section>*/}

        {/*  <SectionAddress address={address} setAddress={setAddress}/>*/}
        {/*  <Button full onClick={actionBridge}>BRIDGE TOKEN</Button>*/}
        {/*</Form>*/}
        {/*{renderModal()}*/}
      </div>
      <Toggle/>

    </div>
  );
};

export default Vault;
