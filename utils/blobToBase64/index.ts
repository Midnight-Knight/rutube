export default async function fileToBase64Chunks(file: File, chunkSize: number): Promise<string[]> {
    const base64Chunks: string[] = [];
    const fileSize = file.size;
    let offset = 0;

    while (offset < fileSize) {
        const chunk = file.slice(offset, offset + chunkSize);
        const base64Chunk = await readFileAsBase64(chunk);
        base64Chunks.push(base64Chunk);
        offset += chunkSize;
    }

    return base64Chunks;
}

// Вспомогательная функция для чтения чанка файла как base64
function readFileAsBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result.toString().split(',')[1]);
            } else {
                reject(new Error("Error reading file chunk as base64"));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
