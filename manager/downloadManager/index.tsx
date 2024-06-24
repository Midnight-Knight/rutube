'use client';
import { useEffect, useRef, useState } from 'react';
import Row from '@/components/row';
import Download from '@/components/download';
import VideoPlayer from '@/components/videoPlayer';
import StatusBlock from '@/components/statusBlock';
import VideoDownload from '@/api/download/video';
import Modal from '@/components/modal';
import VideoStatus from '@/api/status/video';
import ErrorModal from '@/components/modal/errorModal';
import DownloadModal from '@/components/modal/downloadModal';
import ErrorFile from '@/components/modal/errorFile';

export default function DownloadManager() {
  const [file, setFile] = useState<File | null>(null);
  const [stagesFile, setStagesFile] = useState<number>(0);
  const [stagesServer, setStagesServer] = useState<number>(0);
  const [stagesAi, setStagesAi] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    setStagesFile(3);
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
      VideoDownload(file, setId, setStagesServer, setError);
    }
  }

  useEffect(() => {
    if (id) {
      setStagesAi(2);
      VideoStatus(id, setStagesAi, setError, setStagesServer);
    }
  }, [id]);

  useEffect(() => {
    if (stagesFile === 1) {
      setError(null);
      setStagesFile(3);
    }
  }, [stagesFile]);

  useEffect(() => {
    if (stagesFile === 1 || stagesServer === 1 || stagesAi === 1 || stagesAi === 4) {
      setModalOpen(true);
    }
  }, [stagesFile, stagesServer, stagesAi]);

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
      {file ? (
        <VideoPlayer ref={videoRef} file={file} status={false} />
      ) : (
        <Download setFile={setFile} setError={setError} setStagesFile={setStagesFile} setDuration={setDuration} />
      )}
      <StatusBlock
        titleAddBase={true}
        stagesFile={stagesFile}
        stagesServer={stagesServer}
        stagesAi={stagesAi}
        functionServer={() => {
          startDownload();
        }}
        deleteFunction={() => deleteFile()}
        file={file ? file.name : null}
      />
      {
        // prettier-ignore
        (modalOpen && stagesFile === 3) && (
        <Modal closeFunc={setModalOpen}>
          <ErrorFile error={error ? error.message : 'Неизвестная ошибка'} close={() => setModalOpen(false)} />
        </Modal>
      )
      }
      {
        // prettier-ignore
        (modalOpen && (stagesFile === 1 || stagesServer === 1 || stagesAi === 1)) && (
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
      )
      }
      {
        // prettier-ignore
        (modalOpen && stagesAi === 4) && (
        <Modal closeFunc={setModalOpen}>
          <DownloadModal download={true} close={() => setModalOpen(false)} />
        </Modal>
      )
      }
    </Row>
  );
}
