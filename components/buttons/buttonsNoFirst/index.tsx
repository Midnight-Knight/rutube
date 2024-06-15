'use client';
import classNames from 'classnames';
import Style from './repeatButton.module.scss';

type Props = {
  onClick: () => void;
};

export default function ButtonsNoFirst({ onClick }: Props) {
  return (
    <button onClick={onClick} className={classNames(Style.RepeatButton)}>
      <h5>Больше не показывать</h5>
    </button>
  );
}
