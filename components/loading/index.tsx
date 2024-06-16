import Style from '@/components/videoPlayer/videoPlayer.module.scss';
import Image from 'next/image';
import ClockSvg from '@/public/clock-01.svg';

export default function Loading() {
  return (
    <article className={Style.VideoPlayer}>
      <Image src={ClockSvg} alt={'Загрузка'} />
      <h3>Загрузка...</h3>
    </article>
  );
}
