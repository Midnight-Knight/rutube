import { ReactNode } from 'react';
import Style from './column.module.scss';

type Props = {
  text: string;
  children: ReactNode;
};

export default function Column({ text, children }: Props) {
  return (
    <div className={Style.Column}>
      <h2>{text}</h2>
      {children}
    </div>
  );
}
