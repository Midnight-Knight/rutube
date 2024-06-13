import Style from "./downloadModal.module.scss";
import ButtonSuccess from "@/components/buttons/buttonSuccess";

type Props = {
    download: boolean,
    close: () => void,
}

export default function DownloadModal({ download, close }: Props) {
    return (
        <div className={Style.ErrorModal}>
            <h2>УСПЕШНО</h2>
            <h4>Файл успешно обработан и {download ? "добавлен в базу данных" : "готов к модерации"}</h4>
            <div>
                <div style={{flex: 1}}/>
                <ButtonSuccess onClick={close}/>
            </div>
        </div>
    )
}