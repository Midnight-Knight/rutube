import Image from "next/image";
import mp4Svg from "@/public/mp4-01.svg";
import mp3Svg from "@/public/mp3-01.svg";
import Style from "./download.module.scss";
import {ChangeEvent} from "react";

type Props = {
    typeFile: "video" | "audio";
    setFile: (value: File | null) => void;
}

export default function Download({typeFile, setFile}: Props) {

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile?.type === "video/mp4") {
            setFile(selectedFile);
        }
    };

    return (
        <article className={Style.Download}>
            <Image src={typeFile === "video" ? mp4Svg : mp3Svg} alt={"Загрузка файла"}/>
            <input type={"file"} name={"file"} accept={typeFile === "video" ? "video/mp4" : "audio/mp3"} onChange={handleFileChange}/>
            <div>
                <h3>Выберите {typeFile === "video" ? "MP4" : "MP3"} файл</h3>
                <h3>или перетащите его сюда</h3>
            </div>
        </article>
    )
}