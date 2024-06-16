import { ReactNode } from 'react';
import Style from './row.module.scss';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  heightAuto?: boolean;
  up?: boolean;
};

export default function Row({ children, heightAuto = false, up = false }: Props) {
  return <div className={classNames(Style.Row, heightAuto && Style.HeightAuto, up && Style.Up)}>{children}</div>;
}
