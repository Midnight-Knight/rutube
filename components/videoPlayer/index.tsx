import { forwardRef, useEffect, Ref } from 'react';
import Style from './videoPlayer.module.scss';
import classNames from 'classnames';

type Props = {
  file?: File | null;
  status: boolean;
  url?: string;
};

const VideoPlayer = forwardRef<HTMLVideoElement, Props>(({ file, status, url }, ref) => {
  useEffect(() => {
    if (ref && 'current' in ref && ref.current && file) {
      const url = URL.createObjectURL(file);
      ref.current.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (ref && 'current' in ref && ref.current && url) {
      ref.current.src = url;
    }
  }, [file, ref]);

  return (
    <article className={classNames(Style.VideoPlayer, status && Style.Flex2)}>
      <video ref={ref} controls>
        Your browser does not support the video tag.
      </video>
    </article>
  );
});

export default VideoPlayer;
