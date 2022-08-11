import type { FC, ReactNode } from 'react';
import Item from './Item';

export declare type FormType<T> = FC<T> & { Item: typeof Item };

interface FormProps {
  children: ReactNode;
}

const Form: FormType<FormProps> = ({ children }) => {
  return <form>{children}</form>;
};

Form.Item = Item;

export default Form;
