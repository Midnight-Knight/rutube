'use client';
import classNames from "classnames";
import Style from "./buttonSuccess.module.scss";

type Props = {
    onClick: () => void;
}

export default function ButtonSuccess({onClick}:Props) {
    return (
        <button onClick={onClick} className={classNames(Style.ButtonSuccess)}>
            <h5>Закрыть окно</h5>
        </button>
    )
}