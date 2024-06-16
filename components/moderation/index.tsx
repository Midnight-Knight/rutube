'use client';
import Style from './moderation.module.scss';
import DownloadButton from '@/components/buttons/download';
import DeleteButton from '@/components/buttons/delete';
import classNames from 'classnames';

type Props = {
  stagesFile: number;
  stagesServer: number;
  stagesAi: number;
  stagesModeration: number;
  functionServer: () => void;
  deleteFunction: () => void;
  file: null | string;
  data: null | number;
  height?: boolean;
};

export default function Moderation({
  stagesFile,
  stagesServer,
  stagesAi,
  functionServer,
  deleteFunction,
  file,
  stagesModeration,
  data,
  height = false,
}: Props) {
  const color = {
    0: Style.GrayStatus,
    1: Style.RedStatus,
    2: Style.YellowStatus,
    3: Style.GreenStatus,
    4: Style.BlueStatus,
  };

  return (
    <article className={classNames(Style.Moderation, height && Style.Height108)}>
      <div>
        <h3>Статус модерации контента</h3>
        <div className={Style.StatusLine}>
          <div className={color[stagesFile as keyof typeof color]} />
          <h4>Загрузка файла</h4>
        </div>
        <div className={Style.StatusLine}>
          <div className={color[stagesServer as keyof typeof color]} />
          <h4>Отправка файла</h4>
        </div>
        <DownloadButton onClick={functionServer} active={stagesServer === 3 || stagesServer === 1} />
        <div className={Style.StatusLine}>
          <div className={color[stagesAi as keyof typeof color]} />
          <h4>Обработка файла</h4>
        </div>
        <div className={Style.StatusLine}>
          <div className={color[stagesModeration as keyof typeof color]} />
          <h4>Модерация файла</h4>
        </div>
      </div>
      <div>
        <article>
          <h3>Файл</h3>
          <h4>{file ? file : 'Не загружен'}</h4>
          <h4>Количество нарушений: {data !== null ? data : 'Файл ещё не прошёл проверку'}</h4>
        </article>
        <DeleteButton onClick={deleteFunction} active={(stagesServer !== 0 && stagesAi === 0) || (stagesServer !== 0 && stagesAi === 4)} />
      </div>
    </article>
  );
}
