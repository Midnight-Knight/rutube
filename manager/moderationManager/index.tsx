'use client';
import Row from '@/components/row';
import Download from '@/components/download';
import { useEffect, useRef, useState } from 'react';
import VideoPlayer from '@/components/videoPlayer';
import ModerationDownload from '@/api/download/moderation';
import Modal from '@/components/modal';
import ModerationStatus from '@/api/status/moderation';
import ErrorModal from '@/components/modal/errorModal';
import DownloadModal from '@/components/modal/downloadModal';
import ErrorFile from '@/components/modal/errorFile';
import Moderation from '@/components/moderation';
import NoDownload from '@/components/modal/NoDownload';
import FirstModeration from '@/components/modal/firstModeration';
import Timeline from '@/components/timeline';
import Column from '@/components/column';

type TransformedData = {
  matchTitle: string;
  url: string;
  array: {
    startTime: number;
    endTime: number;
    startTimeMatch: number;
    endTimeMatch: number;
  }[];
}[];

export default function ModerationManager() {
  const [storage, setStorage] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [stagesFile, setStagesFile] = useState<number>(0);
  const [stagesServer, setStagesServer] = useState<number>(0);
  const [stagesAi, setStagesAi] = useState<number>(0);
  const [stagesModeration, setStagesModeration] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const [data, setData] = useState<TransformedData | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const videoRefTwo = useRef<HTMLVideoElement>(null);
  const [violations, setViolations] = useState<number | null>(null);

  useEffect(() => {
    setStagesFile(3);
    const storedData = localStorage.getItem('modalNoFirst');
    const parsedData = storedData === 'true';
    setStorage(!parsedData);
    if (!parsedData) {
      setModalOpen(true);
    }
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
      ModerationStatus(id, setStagesAi, setError, setStagesServer, setData, setViolations);
    }
  }, [id]);

  useEffect(() => {
    if (data && data.length === 0) {
      setStagesModeration(4);
    } else if (data && data.length !== 0) {
      setStagesModeration(1);
      setUrlVideo(data[0].url);
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
    setStagesModeration(0);
    setData(null);
  }

  function closeFirst() {
    setStorage(true);
    setModalOpen(false);
  }

  function NoFirst() {
    setStorage(true);
    setModalOpen(false);
    localStorage.setItem('modalNoFirst', 'true');
  }

  function handleSetCurrentTime(time: number) {
    window.scrollTo(0, 0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = time;
    }
  }

  function handleSetCurrentTimeOrigin(time: number, url: string) {
    window.scrollTo(0, 0);
    if (videoRefTwo.current) {
      videoRefTwo.current.pause();
      if (url === urlVideo) {
        videoRefTwo.current.currentTime = time;
      } else {
        setUrlVideo(url);
        videoRefTwo.current.src = url;
        videoRefTwo.current.currentTime = time;
      }
    }
  }

  function changeOriginalVideo(url: string) {
    console.log(url);
    window.scrollTo(0, 0);
    if (videoRefTwo.current) {
      setUrlVideo(url);
      videoRefTwo.current.src = url;
      videoRefTwo.current.pause();
      videoRefTwo.current.currentTime = 0;
    }
  }

  return (
    <>
      <Row heightAuto={true} up={stagesModeration === 1}>
        {
          // prettier-ignore
          (file && stagesModeration !== 1) ? (
          <VideoPlayer ref={videoRef} file={file} status={stagesModeration === 1} />
        ) : (stagesModeration === 1 ? (
          <Column text={'Оригинальное видео'}>
            <VideoPlayer ref={videoRefTwo} url={urlVideo ? urlVideo : "noVideo"} status={stagesModeration === 1} />
          </Column>
        ) : (
          <Download setFile={setFile} setError={setError} />
        ))
        }
        {stagesModeration === 1 ? (
          <Column text={'Проверяемое видео'}>
            <VideoPlayer ref={videoRef} file={file} status={stagesModeration === 1} />
          </Column>
        ) : (
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
            data={violations}
          />
        )}
        {
          // prettier-ignore
          (storage && modalOpen) && (
                  <Modal closeFunc={setModalOpen}>
                    <FirstModeration set={() => NoFirst()} close={() => closeFirst()} />
                  </Modal>
              )
        }
        {
          // prettier-ignore
          (modalOpen && stagesFile === 1) && (
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
          (modalOpen && stagesModeration === 4) && (
                  <Modal closeFunc={setModalOpen}>
                    <DownloadModal download={true} close={() => setModalOpen(false)} />
                  </Modal>
              )
        }
        {
          // prettier-ignore
          (modalOpen && stagesModeration === 1) && (
                  <Modal closeFunc={setModalOpen}>
                    <NoDownload close={() => setModalOpen(false)} />
                  </Modal>
              )
        }
      </Row>
      {
        // prettier-ignore
        (stagesModeration === 1 && data) &&
          <Row up={true}>
            <Timeline data={data} clickVideo={handleSetCurrentTime} clickOriginVideo={handleSetCurrentTimeOrigin} clickOriginUrl={changeOriginalVideo} />
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
                data={violations}
                height={true}
            />
          </Row>
      }
    </>
  );
}
