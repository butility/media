import { Request } from '@butility/network';
import { downloadBlob } from '@/core/blob';

export function uploadFile(file: File, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        Request.post(url, formData, {
            useFetch: true,
            success: (response: any) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(new Error('File upload failed'));
                }
            },
        });
    });
}

export async function downloadFile(
    fileUrl: string,
    fileName: string,
    fileType?: string,
): Promise<any> {
    return new Promise((resolve, reject) => {
        Request.get(
            fileUrl,
            {},
            {
                useFetch: true,
                success: (response: any) => {
                    if (response) {
                        const blob = new Blob(
                            [response],
                            fileType ? { type: fileType } : {},
                        );
                        downloadBlob(blob, fileName);
                        resolve(response);
                    } else {
                        reject(new Error(`Failed to download file.`));
                    }
                },
            },
        );
    });
}
