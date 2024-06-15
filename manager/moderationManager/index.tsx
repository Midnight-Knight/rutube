'use client';
import Row from '@/components/row';
import Download from '@/components/download';
import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/videoPlayer';
import ModerationDownload from '@/api/download/moderation';
import Modal from '@/components/modal';
import VideoStatus from '@/api/status/video';
import ErrorModal from '@/components/modal/errorModal';
import DownloadModal from '@/components/modal/downloadModal';
import ErrorFile from '@/components/modal/errorFile';
import Moderation from '@/components/moderation';
import { TypeData } from '@/types';

export default function ModerationManager() {
  const [file, setFile] = useState<File | null>(null);
  const [stagesFile, setStagesFile] = useState<number>(0);
  const [stagesServer, setStagesServer] = useState<number>(0);
  const [stagesAi, setStagesAi] = useState<number>(0);
  const [stagesModeration, setStagesModeration] = useState<number>(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [data, setData] = useState<TypeData | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setStagesFile(3);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log(file);
    if (file) {
      setStagesFile(4);
      setStagesServer(3);
    }
  }, [file]);

  function startDownload() {
    if (file) {
      setId(null);
      setStagesAi(0);
      setStagesServer(2);
      ModerationDownload(file, setId, setStagesServer, setError);
    }
  }

  useEffect(() => {
    if (id) {
      setStagesAi(2);
      VideoStatus(setSocket, id, setStagesAi, setError, setStagesServer);
    }
  }, [id]);

  useEffect(() => {
    if (data && data.length === 0) {
      setStagesModeration(4);
    } else if (data && data.length !== 0) {
      setStagesModeration(1);
    }
  }, [data]);

  useEffect(() => {
    if (stagesServer === 1 || stagesAi === 1 || stagesAi === 4 || error) {
      setModalOpen(true);
    }
  }, [stagesServer, stagesAi, error]);

  function repeat() {
    setModalOpen(false);
    startDownload();
  }

  function deleteFile() {
    setId(null);
    setFile(null);
    setStagesFile(3);
    setStagesServer(0);
    setStagesAi(0);
  }

  return (
    <Row heightAuto={true}>
      {file ? <VideoPlayer file={file} /> : <Download setFile={setFile} setError={setError} />}
      <Moderation
        stagesFile={stagesFile}
        stagesServer={stagesServer}
        stagesAi={stagesAi}
        functionServer={() => {
          startDownload();
        }}
        deleteFunction={() => deleteFile()}
        file={file ? file.name : null}
        stagesModeration={stagesModeration}
        data={data ? data.length : null}
      />
      {modalOpen && stagesFile === 3 && (
        <Modal closeFunc={setModalOpen}>
          <ErrorFile error={error ? error.message : 'Неизвестная ошибка'} close={() => setModalOpen(false)} />
        </Modal>
      )}
      {modalOpen && (stagesFile === 1 || stagesServer === 1 || stagesAi === 1) && (
        <Modal closeFunc={setModalOpen}>
          <ErrorModal
            close={() => setModalOpen(false)}
            repeat={() => repeat()}
            stages={
              stagesAi === 1
                ? 'Обработка файла'
                : stagesServer === 1
                  ? 'Отправка файла'
                  : stagesFile === 1
                    ? 'Загрузка файла'
                    : 'Неизвестная стадия'
            }
            error={error ? error.message : 'Неизвестная ошибка'}
          />
        </Modal>
      )}
      {modalOpen && stagesAi === 4 && (
        <Modal closeFunc={setModalOpen}>
          <DownloadModal download={true} close={() => setModalOpen(false)} />
        </Modal>
      )}
    </Row>
  );
}
