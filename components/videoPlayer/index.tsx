import {useEffect, useRef} from "react";
import Style from "./videoPlayer.module.scss";

type Props = {
    file: File | null
}

export default function VideoPlayer({file}:Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && file) {
            const url = URL.createObjectURL(file);
            videoRef.current.src = url;

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [file]);

    return (
        <article className={Style.VideoPlayer}>
            <video ref={videoRef} controls>
                Your browser does not support the video tag.
            </video>
        </article>
    );
}