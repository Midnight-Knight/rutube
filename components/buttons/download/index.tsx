'use client';
import classNames from "classnames";
import Style from "./download.module.scss";

type Props = {
    onClick: () => void;
    active: boolean;
}

export default function DownloadButton({onClick, active}:Props) {
    return (
        <button onClick={onClick} disabled={!active} className={classNames(Style.DownloadButton, active ? Style.Active : Style.Off)}>
            <h5>Отправить</h5>
        </button>
    )
}