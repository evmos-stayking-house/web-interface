import type { FC } from 'react';
import React from 'react';
import Image from 'next/image';

import s from './LendingDeposit.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import useLendingDeposit, { DepositTxStatus } from './LendingDeposit.service';
import { numberFormat } from '../../../../utils/numberFormats';
import { Button } from '@mui/material';

interface Props {
  title: string;
  closeModal: VoidFunction;
}

const LendingDeposit: FC<Props> = ({ title, closeModal }) => {
  const { deposit, amount, share, setAmount, tokenBalance, setMaxAmount, amountToShare, approve, txStatus } =
    useLendingDeposit(closeModal);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Deposit {title}</div>
        <Image width={32} height={32} src={'/img/logo/usdc.png'} alt={'usdc token logo'} />
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>
        Available {title} Balance: {numberFormat(tokenBalance)} {title}
      </span>
      <Form>
        <section className={s.depositTokenContainer} onBlur={() => amountToShare()}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={tokenBalance} setInputValue={setAmount} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName}>{title}</div>
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
      <span className={s.desc}>Please note that ibToken exchange rate is not 1:1.</span>
      <span className={s.desc}>
        The amount of ibTokens you will receive is worth the same as the amount of tokens you deposited.
      </span>
      <div className={s.colSpace}></div>
      <span className={cn(s.desc, s.desc__lg)}>You will receive</span>
      <div className={s.ibTokenContainerWrapper}>
        <section className={s.ibTokenContainer}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={share} setInputValue={() => {}} inputValue={share} />
          </Form.Item>
          <div className={s.assetName} style={{ width: '12%' }}>
            ib{title}
          </div>
        </section>
        <div className={s.approveBtnWrapper}>
          <Button
            className={s.approveBtnWrapper__btn}
            onClick={() => (txStatus === DepositTxStatus.NotYet ? approve() : deposit())}>
            {txStatus === DepositTxStatus.NotYet ? 'Approve' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LendingDeposit;
