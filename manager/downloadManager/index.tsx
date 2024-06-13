'use client';
import Row from "@/components/row";
import Download from "@/components/download";
import {useEffect, useState} from "react";
import VideoPlayer from "@/components/videoPlayer";
import AudioPlayer from "@/components/audioPlayer";
import StatusBlock from "@/components/statusBlock";
import VideoDownload from "@/api/download/video";
import Modal from "@/components/modal";
import VideoStatus from "@/api/status/video";
import ErrorModal from "@/components/modal/errorModal";
import DownloadModal from "@/components/modal/downloadModal";

type Props = {
    typeFile: "video" | "audio";
}

export default function DownloadManager({ typeFile }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [stagesFile, setStagesFile] = useState<number>(0);
    const [stagesServer, setStagesServer] = useState<number>(0);
    const [stagesAi, setStagesAi] = useState<number>(0);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [id, setId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setStagesFile(3)
        return () => {
            if (socket)
            {
                socket.close();
            }
        }
    }, []);

    useEffect(() => {
        console.log(file);
        if (file)
        {
            setStagesFile(4);
            setStagesServer(3);
        }
    }, [file])

    function startDownload()
    {
        if (file)
        {
            setId(null);
            setStagesAi(0);
            setStagesServer(2);
            VideoDownload(file, setId, setStagesServer, setError);
        }
    }

    useEffect(() => {
        if (id)
        {
            setStagesAi(2);
            VideoStatus(setSocket, setStagesAi, setError, setStagesServer)
        }
    }, [id]);

    useEffect(() => {
        if (stagesServer === 1 || stagesAi === 1 || stagesAi === 4)
        {
            setModalOpen(true);
        }
    }, [stagesServer, stagesAi]);

    function repeat() {
        setModalOpen(false);
        startDownload();
    }

    return (
        <Row heightAuto={true}>
            {file ? (typeFile === "video" ? <VideoPlayer file={file}/> : <AudioPlayer file={file}/>) : <Download typeFile={typeFile} setFile={setFile}/>}
            <StatusBlock titleAddBase={true} stagesFile={stagesFile} stagesServer={stagesServer} stagesAi={stagesAi} functionServer={() => {startDownload()}} />
            {(modalOpen && (stagesFile === 1 || stagesServer === 1 || stagesAi === 1)) && <Modal closeFunc={setModalOpen}><ErrorModal close={() => setModalOpen(false)} repeat={() => repeat()} stages={stagesAi === 1 ? "Обработка файла" : (stagesServer === 1 ? "Отправка файла" : (stagesFile === 1 ? "Загрузка файла" : "Неизвестная стадия"))} error={error ? error.message : "Неизвестная ошибка"}/></Modal>}
            {(modalOpen && stagesAi === 4) && <Modal closeFunc={setModalOpen}><DownloadModal download={true} close={() => setModalOpen(false)}/></Modal>}
        </Row>
    )
}