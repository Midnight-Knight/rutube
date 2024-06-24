import Style from './timelineManager.module.scss';
import classNames from 'classnames';
import StartLine from '@/components/timeline/timelineManager/startLine';
import Line from '@/components/timeline/timelineManager/line';
import EndLine from '@/components/timeline/timelineManager/endLine';

type Props = {
  video: {
    matchTitle: string;
    url: string;
    array: {
      startTime: number;
      endTime: number;
      startTimeMatch: number;
      endTimeMatch: number;
      startLineWidth?: number;
      endLineWidth?: number;
      segmentLineWidth?: number;
    }[];
  }[];
  originVideo: number;
  clickVideo: (time: number) => void;
  clickOriginVideo: (time: number, url: string) => void;
  clickOriginUrl: (url: string) => void;
};

export default function TimelineManager({ video, clickVideo, clickOriginVideo, clickOriginUrl, originVideo }: Props) {
  const segments = video;

  for (let i = 0; i < segments.length; i++) {
    for (let j = 0; j < segments[i].array.length; j++) {
      segments[i].array[j].startLineWidth = Math.round((segments[i].array[j].startTimeMatch / originVideo) * 100);
      segments[i].array[j].segmentLineWidth = Math.round(
        ((segments[i].array[j].endTimeMatch - segments[i].array[j].startTimeMatch) / originVideo) * 100,
      );
      segments[i].array[j].endLineWidth = Math.round(((originVideo - segments[i].array[j].endTimeMatch) / originVideo) * 100);
    }
  }

  return (
    <article className={Style.TimelineManager}>
      <div className={Style.Heading}>
        <h4 className={Style.Elem}>Оригинальное видео</h4>
        <h4 className={Style.Elem}>Отрезок из проверяемого видео</h4>
        <div className={Style.Elem} />
        <div className={Style.Elem} />
        <div className={Style.Elem} />
      </div>
      {segments.map((elem, index) => (
        <div key={'object' + index} className={Style.Object}>
          <div className={Style.Line}>
            <h4 onClick={() => clickOriginUrl(elem.url)} className={classNames(Style.Elem, Style.Links)}>
              {elem.matchTitle}
            </h4>
            <div className={Style.Lines}>
              <StartLine width={elem.array[0].startLineWidth} />
              <Line
                width={elem.array[0].segmentLineWidth}
                start={elem.array[0].startTimeMatch}
                end={elem.array[0].endTimeMatch}
                clickOriginVideo={clickOriginVideo}
                clickVideo={clickVideo}
                url={elem.url}
                startOrigin={elem.array[0].startTime}
                endOrigin={elem.array[0].endTime}
              />
              <EndLine width={elem.array[0].endLineWidth} length={originVideo} />
            </div>
          </div>
          {elem.array.map(
            (elem2, index2) =>
              index2 !== 0 && (
                <div key={'line' + index2} className={Style.Line}>
                  <div className={Style.Elem} />
                  <div className={Style.Lines}>
                    <StartLine width={elem2.startLineWidth} />
                    <Line
                      width={elem2.segmentLineWidth}
                      start={elem2.startTimeMatch}
                      end={elem2.endTimeMatch}
                      url={elem.url}
                      clickVideo={clickVideo}
                      clickOriginVideo={clickOriginVideo}
                      startOrigin={elem2.startTime}
                      endOrigin={elem2.endTime}
                    />
                    <EndLine width={elem2.endLineWidth} length={originVideo} />
                  </div>
                </div>
              ),
          )}
        </div>
      ))}
    </article>
  );
}
