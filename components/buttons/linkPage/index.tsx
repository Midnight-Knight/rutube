import Link from "next/link";
import Style from "./linkPage.module.scss";

type Props = {
    link: string,
    text: string,
}

export default function LinkPage({link, text}:Props) {
    return (
        <Link href={link} className={Style.LinkPage}>
            <h3>{text}</h3>
        </Link>
    )
}