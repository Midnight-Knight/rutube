import Image from 'next/image';
import mp4Svg from '@/public/mp4-01.svg';
import Style from './download.module.scss';
import { ChangeEvent, useState } from 'react';

type Props = {
  setFile: (value: File | null) => void;
  setError: (error: Error | null) => void;
  setDuration: (value: number | null) => void;
  setStagesFile: (value: number) => void;
};

export default function Download({ setFile, setError, setStagesFile, setDuration }: Props) {
  const [key, setKey] = useState(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = event.target.files?.[0] || null;
      if (selectedFile) {
        if (selectedFile.size > 5368709120) {
          setStagesFile(1);
          setError(new Error('Размер данного файла больше 5 ГБ'));
          setKey(key + 1);
        } else if (selectedFile.type !== 'video/mp4') {
          setStagesFile(1);
          setError(new Error('Неправильный тип файла, необходим файл формата MP4'));
          setKey(key + 1);
        } else {
          const videoElement = document.createElement('video');
          videoElement.preload = 'metadata';
          videoElement.src = URL.createObjectURL(selectedFile);
          videoElement.onloadedmetadata = () => {
            URL.revokeObjectURL(videoElement.src);
            if (videoElement.duration < 31) {
              setStagesFile(1);
              setError(new Error('Продолжительность видео должна быть не менее 31 секунды'));
              setKey(key + 1);
            } else {
              setDuration(videoElement.duration);
              setFile(selectedFile);
              setError(null);
            }
          };
          videoElement.onerror = () => {
            setStagesFile(1);
            setError(new Error('Не удалось загрузить видео'));
            setKey(key + 1);
          };
        }
      } else {
        setStagesFile(1);
        setError(null);
        setKey(key + 1);
      }
    } catch (error) {
      if (error instanceof Error) {
        setStagesFile(1);
        setError(error);
        setKey(key + 1);
      }
    }
  };

  return (
    <article className={Style.Download}>
      <Image src={mp4Svg} alt={'Загрузка файла'} />
      <input key={key} type={'file'} name={'file'} accept={'video/mp4'} onChange={handleFileChange} />
      <div>
        <h3>Выберите {'MP4'} файл</h3>
        <h3>или перетащите его сюда</h3>
      </div>
    </article>
  );
}
