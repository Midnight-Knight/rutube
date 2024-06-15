import { WS_VIDEO_MODERATION } from '@/consts/api';
import { TypeData } from '@/types';

async function dataFetch(setData: (value: TypeData | null) => void, id: number) {
  const fetchData = await fetch(`https://${WS_VIDEO_MODERATION}`);
}

export default async function VideoStatus(
  ws: (value: WebSocket | null) => void,
  statusStagesAi: (value: number) => void,
  setError: (Value: Error) => void,
  statusStagesServer: (value: number) => void,
  id: number,
  setData: (value: TypeData | null) => void,
) {
  const newSocket = new WebSocket(WS_VIDEO_MODERATION);
  ws(newSocket);

  newSocket.onopen = () => {
    console.log('WebSocket opened');
  };

  newSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.videoState) {
      if (message.videoState === 6) {
        statusStagesAi(4);
      } else if (message.videoState === 3) {
        setError(new Error(`Верификация завершена с ошибками`));
        statusStagesAi(1);
        statusStagesServer(1);
        newSocket.close();
        ws(null);
        console.log(`Верификация завершена с ошибками`);
      }
    }
  };

  newSocket.onerror = (error) => {
    if (error instanceof Error) {
      ws(null);
      setError(error);
      statusStagesAi(1);
      statusStagesServer(1);
      console.log('WebSocket error:', error);
    }
  };

  // Закрытие WebSocket подключения
  newSocket.onclose = (event) => {
    if (event.code === 1006) {
      const error = new Error('WebSocket connection closed unexpectedly');
      setError(error);
      statusStagesAi(1);
      statusStagesServer(1);
      console.log('WebSocket connection closed unexpectedly:', event);
    } else {
      console.log('WebSocket connection closed:', event);
    }
  };
}
