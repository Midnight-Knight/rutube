import Style from './errorFile.module.scss';
import ButtonError from '@/components/buttons/buttonError';

type Props = {
  error: string;
  close: () => void;
};

export default function ErrorFile({ error, close }: Props) {
  return (
    <div className={Style.ErrorFile}>
      <h2>ОШИБКА</h2>
      <h4>Этап: Загрузка файла</h4>
      <p>{error}</p>
      <div>
        <div style={{ flex: 1 }} />
        <ButtonError onClick={close} />
      </div>
    </div>
  );
}
