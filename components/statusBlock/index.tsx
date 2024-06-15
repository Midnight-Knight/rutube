'use client';
import Style from "./statusBlock.module.scss";
import DownloadButton from "@/components/buttons/download";
import DeleteButton from "@/components/buttons/delete";

type Props = {
    titleAddBase: true,
    stagesFile: number,
    stagesServer: number,
    stagesAi: number,
    functionServer: () => void,
    deleteFunction: () => void,
    file: null | string,
}

export default function StatusBlock({titleAddBase, stagesFile, stagesServer, stagesAi, functionServer, deleteFunction, file}:Props) {

    const color = {
        0: Style.GrayStatus,
        1: Style.RedStatus,
        2: Style.YellowStatus,
        3: Style.GreenStatus,
        4: Style.BlueStatus
    }

    return (
        <article className={Style.StatusBlock}>
            <div>
                <h3>Статус {titleAddBase ? "пополнения базы" : "загрузки контента для модерации"}</h3>
                <div className={Style.StatusLine}>
                    <div className={color[stagesFile as keyof typeof color]}/>
                    <h4>Загрузка файла</h4>
                </div>
                <div className={Style.StatusLine}>
                    <div className={color[stagesServer as keyof typeof color]}/>
                    <h4>Отправка файла</h4>
                </div>
                <DownloadButton onClick={functionServer} active={stagesServer === 3 || stagesServer === 1}/>
                <div className={Style.StatusLine}>
                    <div className={color[stagesAi as keyof typeof color]}/>
                    <h4>Обработка файла</h4>
                </div>
            </div>
            <div>
                <article>
                    <h3>Файл</h3>
                    <h4>{file ? file : "Не загружен"}</h4>
                </article>
                <DeleteButton onClick={deleteFunction} active={(stagesServer !== 0 && stagesAi === 0) || (stagesServer !== 0 && stagesAi === 4)}/>
            </div>
        </article>
    )
}