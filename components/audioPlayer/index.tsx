import {useEffect, useRef} from "react";

type Props = {
    file: File | null
}

export default function AudioPlayer({file}: Props) {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current && file) {
            const url = URL.createObjectURL(file);
            audioRef.current.src = url;

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [file]);

    return (
        <audio ref={audioRef} controls>
            Your browser does not support the audio element.
        </audio>
    );
}