import Style from './startLine.module.scss';

type Props = {
  width: number | undefined;
};

export default function StartLine({ width }: Props) {
  return (
    <div className={Style.StartLine} style={{ width: width + '%', display: width === 0 ? 'none' : 'block' }}>
      <div />
      <article>
        <p>0</p>
      </article>
    </div>
  );
}
