'use client';
import classNames from "classnames";
import Style from "./buttonError.module.scss";

type Props = {
    onClick: () => void;
}

export default function ButtonError({onClick}:Props) {
    return (
        <button onClick={onClick} className={classNames(Style.ButtonError)}>
            <h5>Закрыть окно</h5>
        </button>
    )
}