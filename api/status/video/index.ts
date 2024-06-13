import {WS_VIDEO_DOWNLOAD} from "@/consts/api";


export default async function VideoStatus(ws: (value: WebSocket | null)=>void, statusStagesAi: (value: number) => void, setError: (Value: Error) => void, statusStagesServer: (value: number) => void) {
    const newSocket = new WebSocket(WS_VIDEO_DOWNLOAD);
    ws(newSocket);

    newSocket.onopen = () => {
        console.log("WebSocket opened");
    }

    newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.ai)
        {
            statusStagesAi(message.ai);
        }
        console.log(message.message);
    }

    newSocket.onerror = (error) => {
        if (error instanceof Error)
        {
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