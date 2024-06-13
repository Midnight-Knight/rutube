'use client';
import {ReactNode} from "react";
import Image from "next/image";
import closeSvg from "@/public/cancel-01.svg"
import Style from "./modal.module.scss";

type Props = {
    children: ReactNode;
    closeFunc: (value: boolean) => void;
}

export default function Modal({children, closeFunc}:Props) {
    return (
        <div className={Style.Modal}>
            <button onClick={() => closeFunc(false)}>
                <Image src={closeSvg} alt={"close"}/>
            </button>
            <article>
                {children}
            </article>
        </div>
    )
}