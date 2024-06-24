import Style from './endLine.module.scss';

type Props = {
  width: number | undefined;
  length: number;
};

export default function EndLine({ width, length }: Props) {
  return (
    <div className={Style.EndLine} style={{ width: width + '%', display: width === 100 ? 'none' : 'block' }}>
      <div />
      <article>
        <p>{length}</p>
      </article>
    </div>
  );
}
