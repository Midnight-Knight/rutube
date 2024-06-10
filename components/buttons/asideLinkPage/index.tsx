'use client'
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import { usePathname } from 'next/navigation'
import classNames from "classnames";
import Style from "./asideLinkPage.module.scss";

type Props = {
    link: string;
    text: string;
    svg: StaticImageData;
}

export default function AsideLinkPage({link, text, svg}:Props) {
    const pathname = usePathname()
    return (
        <Link href={link} className={classNames(Style.AsideLinkPage, pathname === link ? Style.Active : Style.Offline)}>
            <Image src={svg} alt={text}/>
            <h5>{text}</h5>
        </Link>
    )
}