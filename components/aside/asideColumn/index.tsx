import {ReactNode} from "react";
import Style from "./asideColumn.module.scss";

type Props = {
    children: ReactNode;
}

export default function AsideColumn({children}:Props) {
    return (
        <div className={Style.AsideColumn}>
            {children}
        </div>
    )
}