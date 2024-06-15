import { WS_VIDEO_MODERATION } from '@/consts/api';
import { TypeData } from '@/types';

let intervalId: any;

async function checkVideoModerationState(
  id: number,
  statusStagesAi: (value: number) => void,
  setError: (Value: Error) => void,
  statusStagesServer: (value: number) => void,
  setData: (value: TypeData | null) => void,
) {
  try {
    // Выполняем запрос на сервер
    let response = await fetch(WS_VIDEO_MODERATION + '?fileId=' + id, {
      method: 'POST',
      body: JSON.stringify({ message: 'hello world!' }),
    });
    const message = await response.json();
    console.log(message);
    if (message.videoState) {
      if (message.videoState === 6 || message.videoState === 3) {
        statusStagesAi(4);
        setData(message.matches);
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

export default async function ModerationStatus(
  id: number,
  statusStagesAi: (value: number) => void,
  setError: (Value: Error) => void,
  statusStagesServer: (value: number) => void,
  setData: (value: TypeData | null) => void,
) {
  console.log(WS_VIDEO_MODERATION);
  intervalId = setInterval(() => checkVideoModerationState(id, statusStagesAi, setError, statusStagesServer, setData), 1000);
}
