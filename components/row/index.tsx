import {ReactNode} from "react";
import Style from "./row.module.scss";

type Props = {
    children: ReactNode;
}

export default function Row({children}: Props) {
    return (
        <div className={Style.Row}>
            {children}
        </div>
    )
}