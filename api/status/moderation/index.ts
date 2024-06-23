import { WS_VIDEO_MODERATION } from '@/consts/api';
import { TypeData } from '@/types';

type TransformedData = {
  matchTitle: string;
  url: string;
  array: {
    startTime: number;
    endTime: number;
    startTimeMatch: number;
    endTimeMatch: number;
  }[];
};

export const transformData = (data: TypeData) => {
  return data.reduce<TransformedData[]>((acc, item) => {
    const { matchTitle, url, startTime, endTime, startTimeMatch, endTimeMatch } = item;
    const existingItem = acc.find((group) => group.matchTitle === matchTitle && group.url === url);
    const newItem = { startTime, endTime, startTimeMatch, endTimeMatch };

    if (existingItem) {
      existingItem.array.push(newItem);
    } else {
      acc.push({ matchTitle, url, array: [newItem] });
    }

    return acc;
  }, []);
};

let intervalId: any;

async function checkVideoModerationState(
  id: number,
  statusStagesAi: (value: number) => void,
  setError: (Value: Error) => void,
  statusStagesServer: (value: number) => void,
  setData: (value: TransformedData[] | null) => void,
  setViolations: (value: number | null) => void,
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
        for (let i = 0; i < message.matches.length; i++) {
          if (typeof message.matches[i].startTime === 'string') {
            message.matches[i].startTime = Number(message.matches[i].startTime);
          }
          if (typeof message.matches[i].endTime === 'string') {
            message.matches[i].endTime = Number(message.matches[i].endTime);
          }
          if (typeof message.matches[i].startTimeMatch === 'string') {
            message.matches[i].startTimeMatch = Number(message.matches[i].startTimeMatch);
          }
          if (typeof message.matches[i].endTimeMatch === 'string') {
            message.matches[i].endTimeMatch = Number(message.matches[i].endTimeMatch);
          }
        }
        const trData = transformData(message.matches);
        console.log(trData);
        setViolations(message.matches.length);
        statusStagesAi(4);
        setData(trData);
        clearInterval(intervalId);
      }
    }
  } catch (error) {
    console.error('Error fetching [video] state:', error);
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
  setData: (value: TransformedData[] | null) => void,
  setViolations: (value: number | null) => void,
) {
  console.log(WS_VIDEO_MODERATION);
  intervalId = setInterval(() => checkVideoModerationState(id, statusStagesAi, setError, statusStagesServer, setData, setViolations), 5000);
}

/*
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
        if (Array.isArray(message.matches)) {
          const transformedMatches = message.matches.map((match: any) => {
            return {
              ...match,
              endTime: parseFloat(match.endTime),
              startTime: parseFloat(match.startTime),
              endTimeMatch: parseFloat(match.endTimeMatch),
              StartTimeMatch: parseFloat(match.StartTimeMatch),
            };
          });

          // Проверка успешности преобразования
          const validMatches = transformedMatches.every(
            (match: any) => !isNaN(match.endTime) && !isNaN(match.startTime) && !isNaN(match.endTimeMatch) && !isNaN(match.StartTimeMatch),
          );

          if (validMatches) {
            statusStagesAi(4);
            setData(transformedMatches);
          } else {
            console.error('Invalid match data:', transformedMatches);
            setError(new Error('Invalid match data'));
          }
        } else {
          console.error('Matches is not an array:', message.matches);
          setError(new Error('Matches is not an array'));
        }
        clearInterval(intervalId);
      }
    }
  } catch (error) {
    console.error('Error fetching [video] state:', error);
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

 */
