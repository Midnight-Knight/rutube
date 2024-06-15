import Image from 'next/image';
import mp4Svg from '@/public/mp4-01.svg';
import mp3Svg from '@/public/mp3-01.svg';
import Style from './download.module.scss';
import { ChangeEvent } from 'react';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

type Props = {
  setFile: (value: File | null) => void;
  setError: (error: Error | null) => void;
};

export default function Download({ setFile, setError }: Props) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = event.target.files?.[0] || null;
      if (selectedFile && selectedFile?.size > 5368709120) {
        setError(new Error('Размер данного файла больше 5 ГБ'));
      } else if (selectedFile && selectedFile?.type !== 'video/mp4') {
        setError(new Error('Неправильный тип файла, необходим файл формата MP4'));
      } else {
        setFile(selectedFile);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  return (
    <article className={Style.Download}>
      <Image src={mp4Svg} alt={'Загрузка файла'} />
      <input type={'file'} name={'file'} accept={'video/mp4'} onChange={handleFileChange} />
      <div>
        <h3>Выберите {'MP4'} файл</h3>
        <h3>или перетащите его сюда</h3>
      </div>
    </article>
  );
}
