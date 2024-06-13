'use client';
import classNames from "classnames";
import Style from "./repeatButton.module.scss";

type Props = {
    onClick: () => void;
}

export default function RepeatButton({onClick}:Props) {
    return (
        <button onClick={onClick} className={classNames(Style.RepeatButton)}>
            <h5>Повторить отправку</h5>
        </button>
    )
}