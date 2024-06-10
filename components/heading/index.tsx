import Style from "./heading.module.scss";

type Props = {
    title: string,
    text: null | string,
}

export default function Heading({title, text}: Props) {
    return (
        <div className={Style.Heading}>
            <h1>{title}</h1>
            {text && <h3>{text}</h3>}
        </div>
    )
}