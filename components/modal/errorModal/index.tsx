import Style from "./errorModal.module.scss";
import RepeatButton from "@/components/buttons/repeatButton";
import ButtonError from "@/components/buttons/buttonError";

type Props = {
    stages: string,
    error: string,
    close: () => void,
    repeat: () => void,
}

export default function ErrorModal({ stages, error, repeat, close }: Props) {
    return (
        <div className={Style.ErrorModal}>
            <h2>ОШИБКА</h2>
            <h4>Этап: {stages}</h4>
            <p>{error}</p>
            <div>
                {(stages === "Обработка файла" || stages === "Отправка файла") ? <RepeatButton onClick={repeat}/> : <div style={{flex: 1}}/>}
                <ButtonError onClick={close}/>
            </div>
        </div>
    )
}