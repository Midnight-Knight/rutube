import Style from './text.module.scss';
import classNames from 'classnames';

type Props = {
  video: {
    matchTitle: string;
    url: string;
    array: {
      startTime: number;
      endTime: number;
      startTimeMatch: number;
      endTimeMatch: number;
    }[];
  }[];
  clickVideo: (time: number) => void;
  clickOriginVideo: (time: number, url: string) => void;
  clickOriginUrl: (url: string) => void;
};

export default function Text({ video, clickVideo, clickOriginVideo, clickOriginUrl }: Props) {
  return (
    <article className={Style.Text}>
      <div className={Style.Heading}>
        <h4 className={Style.Elem}>Оригинальное видео</h4>
        <h4 className={Style.Elem}>Начало отрезка из оригинального видео</h4>
        <h4 className={Style.Elem}>Конец отрезка из оригинального видео</h4>
        <h4 className={Style.Elem}>Начало отрезка из проверяемого видео</h4>
        <h4 className={Style.Elem}>Конец отрезка из проверяемого видео</h4>
      </div>
      {video.map((elem, index) => (
        <div key={'object' + index} className={Style.Object}>
          <div className={Style.Line}>
            <h4 onClick={() => clickOriginUrl(elem.url)} className={classNames(Style.Elem, Style.Links)}>
              {elem.matchTitle}
            </h4>
            <h4 onClick={() => clickOriginVideo(elem.array[0].startTime, elem.url)} className={classNames(Style.Elem, Style.Links)}>
              {elem.array[0].startTime} сек.
            </h4>
            <h4 onClick={() => clickOriginVideo(elem.array[0].endTime, elem.url)} className={classNames(Style.Elem, Style.Links)}>
              {elem.array[0].endTime} сек.
            </h4>
            <h4 onClick={() => clickVideo(elem.array[0].startTimeMatch)} className={classNames(Style.Elem, Style.Links)}>
              {elem.array[0].startTimeMatch} сек.
            </h4>
            <h4 onClick={() => clickVideo(elem.array[0].endTimeMatch)} className={classNames(Style.Elem, Style.Links)}>
              {elem.array[0].endTimeMatch} сек.
            </h4>
          </div>
          {elem.array.map(
            (elem2, index2) =>
              index2 !== 0 && (
                <div key={'line' + index2} className={Style.Line}>
                  <div className={Style.Elem} />
                  <h4 onClick={() => clickOriginVideo(elem2.startTime, elem.url)} className={classNames(Style.Elem, Style.Links)}>
                    {' '}
                    {elem2.startTime} сек.
                  </h4>
                  <h4 onClick={() => clickOriginVideo(elem2.endTime, elem.url)} className={classNames(Style.Elem, Style.Links)}>
                    {elem2.endTime} сек.
                  </h4>
                  <h4 onClick={() => clickVideo(elem2.startTimeMatch)} className={classNames(Style.Elem, Style.Links)}>
                    {elem2.startTimeMatch} сек.
                  </h4>
                  <h4 onClick={() => clickVideo(elem2.endTimeMatch)} className={classNames(Style.Elem, Style.Links)}>
                    {elem2.endTimeMatch} сек.
                  </h4>
                </div>
              ),
          )}
        </div>
      ))}
    </article>
  );
}
