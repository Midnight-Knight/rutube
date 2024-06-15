import Style from './errorModal.module.scss';
import RepeatButton from '@/components/buttons/repeatButton';
import ButtonSuccess from '@/components/buttons/buttonSuccess';
import ButtonsNoFirst from '@/components/buttons/buttonsNoFirst';

type Props = {
  set: () => void;
  close: () => void;
};

export default function FirstModeration({ set, close }: Props) {
  return (
    <div className={Style.ErrorModal}>
      <h2>ВНИМАНИЕ</h2>
      <h4>Страница модерации</h4>
      <p>
        Внимание, в случае успешной модерации, ваш видеоконтент автоматически будет загружен в базу данных, в противном же случае,
        видеоконтент не будет добавлен в базу данных.
      </p>
      <div>
        <ButtonsNoFirst onClick={set} />
        <ButtonSuccess onClick={close} />
      </div>
    </div>
  );
}
