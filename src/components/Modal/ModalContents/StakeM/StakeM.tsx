import type { FC } from 'react';

import s from './StakeM.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import useStakeM from './StakeM.Service';
import { Button, Dropdown } from '@nextui-org/react';
import React from 'react';

interface Props {
  closeModal: VoidFunction;
}

const StakeM: FC<Props> = ({ closeModal }) => {
  const {
    evmosBalance,
    deptInBase,
    positionValue,
    leverage,
    onChangeLeverage,
    borrowingAsset,
    onChangeBorrowingAsset,
    amount,
    setAmount,
    deptInToken,
    borrowingAssetBalance,
    setMaxAmount,
    onChangeSuppliedAmount,
    addPosition
  } = useStakeM(closeModal);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>EVMOS Leveraged Staking</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Staking Asset</span>
      <span className={cn(s.desc)}>Available Balance: {evmosBalance} EVMOS</span>
      <Form>
        <section className={s.depositTokenContainer} onBlur={() => onChangeSuppliedAmount()}>
          <img className={s.btnIcon} src={`/img/logo/evmos.png`} alt={'evmos icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={evmosBalance} setInputValue={setAmount} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName}>EVMOS</div>
          <button
            className={s.maxBtn}
            onClick={(e) => {
              e.preventDefault();
              setMaxAmount();
            }}>
            max
          </button>
        </section>
      </Form>
      <div className={s.colSpace}></div>
      <span className={cn(s.desc, s.desc__lg)}>Borrowing Asset</span>
      <div className={s.ibTokenContainerWrapper}>
        <Dropdown>
          <Dropdown.Button
            css={{
              tt: 'capitalize',
              height: '48px',
              background: '#D9D9D9',
              color: '#4D4545',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}>
            <img className={s.icon} src={`/img/common/token/${borrowingAsset || 'ATOM'}.png`} alt={'cosmos icon'} />
            <span className={s.label}>{borrowingAsset}</span>
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={borrowingAsset}
            onSelectionChange={onChangeBorrowingAsset}>
            <Dropdown.Item
              icon={<img className={s.icon} src={'/img/logo/cosmos.png'} alt={'cosmos icon'} />}
              key="ATOM">
              ATOM
            </Dropdown.Item>
            <Dropdown.Item
              icon={<img className={s.icon} src={'/img/logo/osmosis.png'} alt={'osmosis icon'} />}
              key="OSMO">
              OSMO
            </Dropdown.Item>
            <Dropdown.Item icon={<img className={s.icon} src={'/img/logo/juno.png'} alt={'juno icon'} />} key="JUNO">
              JUNO
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <span className={cn(s.desc)}>Available Balance: {borrowingAssetBalance} ATOM</span>
      <Form>
        <section className={s.borrowingTokenContainer}>
          <img className={s.btnIcon} src={`/img/common/token/${borrowingAsset || 'ATOM'}.png`} alt={'cosmos icon'} />
          <span className={s.input}>{deptInToken}</span>
          <div className={s.assetName}>ATOM</div>
        </section>
      </Form>
      <div className={s.leverageContainer}>
        <span className={cn(s.desc, s.desc__lg)}>Leverage</span>
        <Dropdown>
          <Dropdown.Button
            color="secondary"
            css={{
              tt: 'capitalize',
              height: '48px',
              background: '#D9D9D9',
              color: '#4D4545',
              flexDirection: 'row',
              width: '20%',
              justifyContent: 'space-between'
            }}>
            {leverage}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={leverage}
            onSelectionChange={onChangeLeverage}>
            <Dropdown.Item key="1.0">1.0</Dropdown.Item>
            <Dropdown.Item key="1.5">1.5</Dropdown.Item>
            <Dropdown.Item key="2.0">2.0</Dropdown.Item>
            <Dropdown.Item key="2.5">2.5</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={s.divider}></div>
      <div className={s.summaryWrapper}>
        <div className={s.total}>
          <div className={s.totalRow}>
            <span className={s.totalRow__title}>Total APY/APR</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Yield Staking</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Borrowing Interest</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Total APR</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Total APY</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
        </div>
        <div className={s.summary}>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__title}>Summary</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Supplied</span>
            <span className={s.summaryRow__value}>{Number(amount).toFixed(1)} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Borrowed</span>
            <span className={s.summaryRow__value}>{deptInBase} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Total Position Value</span>
            <span className={s.summaryRow__value}>{positionValue} EVMOS</span>
          </div>
        </div>
      </div>
      <div className={s.btnWrapper}>
        <Button className={s.stakeBtn} onPress={() => addPosition()}>
          STAKE
        </Button>
      </div>
    </div>
  );
};

export default StakeM;
