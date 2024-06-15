import { WS_VIDEO_DOWNLOAD } from '@/consts/api';

let intervalId: any;

async function checkVideoState(
  id: number,
  statusStagesAi: (value: number) => void,
  setError: (Value: Error) => void,
  statusStagesServer: (value: number) => void,
) {
  try {
    // Выполняем запрос на сервер
    let response = await fetch(WS_VIDEO_DOWNLOAD + '?fileId=' + id, {
      method: 'POST',
      body: JSON.stringify({ message: 'hello world!' }),
    });
    console.log(await response);
    const message = await response.json();
    console.log(message);
    if (message.videoState) {
      if (message.videoState === 6) {
        statusStagesAi(4);
        clearInterval(intervalId);
      } else if (message.videoState === 3) {
        setError(new Error(`Верификация завершена с ошибками`));
        statusStagesAi(1);
        statusStagesServer(1);
        console.log(`Верификация завершена с ошибками`);
        clearInterval(intervalId);
      }
    }
  } catch (error) {
    console.error('Error fetching video state:', error);
    statusStagesServer(1);
    if (error instanceof Error) {
      setError(error);
    }
    clearInterval(intervalId);
  }
}

export default async function VideoStatus(
  id: number,
  statusStagesAi: (value: number) => void,
  setError: (Value: Error) => void,
  statusStagesServer: (value: number) => void,
) {
  console.log(WS_VIDEO_DOWNLOAD);
  intervalId = setInterval(() => checkVideoState(id, statusStagesAi, setError, statusStagesServer), 1000);
}
