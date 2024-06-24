'use client';
import { useState } from 'react';
import Text from '@/components/timeline/text';
import { TypeData } from '@/types';
import Style from './timeline.module.scss';
import TimelineManager from '@/components/timeline/timelineManager';

type TransformedData = {
  matchTitle: string;
  url: string;
  array: {
    startTime: number;
    endTime: number;
    startTimeMatch: number;
    endTimeMatch: number;
  }[];
};

type Props = {
  data: TransformedData[];
  duration: number;
  clickVideo: (time: number) => void;
  clickOriginVideo: (time: number, url: string) => void;
  clickOriginUrl: (url: string) => void;
};

export default function Timeline({ data, clickVideo, clickOriginVideo, clickOriginUrl, duration }: Props) {
  const [text, setText] = useState<boolean>(true);

  return (
    <article className={Style.Timeline}>
      <h2>Блок совпадений/нарушений</h2>
      <div>
        <button
          className={text ? Style.Active : Style.Passive}
          onClick={() => {
            setText(true);
          }}>
          <h3>Таблица</h3>
          <div />
        </button>
        <button
          className={text ? Style.Passive : Style.Active}
          onClick={() => {
            setText(false);
          }}>
          <h3>Таймлайн</h3>
          <div />
        </button>
      </div>
      {text ? (
        <Text video={data} clickVideo={clickVideo} clickOriginVideo={clickOriginVideo} clickOriginUrl={clickOriginUrl} />
      ) : (
        <TimelineManager
          video={data}
          clickVideo={clickVideo}
          clickOriginVideo={clickOriginVideo}
          clickOriginUrl={clickOriginUrl}
          originVideo={duration}
        />
      )}
    </article>
  );
}
