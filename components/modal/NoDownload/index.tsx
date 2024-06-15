import Style from './errorFile.module.scss';
import ButtonError from '@/components/buttons/buttonError';

type Props = {
  close: () => void;
};

export default function NoDownload({ close }: Props) {
  return (
    <div className={Style.ErrorFile}>
      <h2>ОШИБКА</h2>
      <h4>Этап: Модерация файла</h4>
      <p>Файл обработан, но не загружен в базу данных. Ваш файл не прошёл проверку на нарушение авторских прав.</p>
      <div>
        <div style={{ flex: 1 }} />
        <ButtonError onClick={close} />
      </div>
    </div>
  );
}
