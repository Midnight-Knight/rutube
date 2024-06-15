'use client';
import classNames from "classnames";
import Style from "./delete.module.scss";

type Props = {
    onClick: () => void;
    active: boolean;
}

export default function DeleteButton({onClick, active}:Props) {
    return (
        <button onClick={onClick} disabled={!active} className={classNames(Style.Delete, active ? Style.Active : Style.Off)}>
            <h5>Начать заново</h5>
        </button>
    )
}