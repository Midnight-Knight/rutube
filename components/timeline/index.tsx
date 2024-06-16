'use client';
import { useState } from 'react';
import Text from '@/components/timeline/text';
import { TypeData } from '@/types';
import Style from './timeline.module.scss';

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
  clickVideo: (time: number) => void;
  clickOriginVideo: (time: number, url: string) => void;
  clickOriginUrl: (url: string) => void;
};

export default function Timeline({ data, clickVideo, clickOriginVideo, clickOriginUrl }: Props) {
  const [text, setText] = useState<boolean>(true);

  return (
    <article className={Style.Timeline}>
      <h2>Блок совпадений/нарушений</h2>
      <div></div>
      {text ? <Text video={data} clickVideo={clickVideo} clickOriginVideo={clickOriginVideo} clickOriginUrl={clickOriginUrl} /> : <></>}
    </article>
  );
}
