import { HTTP_VIDEO_DOWNLOAD, HTTP_VIDEO_MODERATION } from '@/consts/api/index';

export default async function ModerationDownload(
  file: File,
  id: (value: number) => void,
  statusStagesServer: (value: number) => void,
  setError: (Value: Error) => void,
) {
  try {
    console.log('start download');
    const formData = new FormData();
    formData.append('video', file, file.name);
    let response = await fetch(HTTP_VIDEO_DOWNLOAD, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('id: ' + result.id);
    id(result.id);
    statusStagesServer(4);
  } catch (error) {
    if (error instanceof Error) {
      setError(error);
      statusStagesServer(1);
    }
  }
}