import Style from './line.module.scss';

type Props = {
  width: number | undefined;
  start: number;
  end: number;
  clickVideo: (time: number) => void;
  clickOriginVideo: (time: number, url: string) => void;
  url: string;
  startOrigin: number;
  endOrigin: number;
};

export default function Line({ width, start, end, clickVideo, clickOriginVideo, url, startOrigin, endOrigin }: Props) {
  function Start() {
    clickVideo(start);
    clickOriginVideo(startOrigin, url);
  }

  function End() {
    clickVideo(end);
    clickOriginVideo(endOrigin, url);
  }

  return (
    <div className={Style.Line} style={{ width: width + '%' }}>
      <div>
        <button onClick={() => Start()} />
        <button onClick={() => End()} />
      </div>
      <article>
        <p>{start}</p>
        <p>{end}</p>
      </article>
    </div>
  );
}
