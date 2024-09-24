import { a, body } from '@butility/dom/html';
import type { VerifyBlobOptions } from '@/types/media';

export function convertBase64ToBlob(
    base64: string,
    contentType: string,
    onProgress?: Function | null,
): Blob {
    try {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
            if (onProgress) onProgress(i / byteCharacters.length);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    } catch (error: any) {
        throw new Error(`Failed to convert base64 to Blob: ${error.message}`);
    }
}

export async function convertBlobToBase64(
    blob: Blob,
    onProgress?: (progress: number) => void | null,
): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                onProgress(event.loaded / event.total);
            }
        };

        reader.onloadend = () => {
            if (reader.result) {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error('Reader result is empty'));
            }
        };

        reader.onerror = () =>
            reject(new Error('Failed to convert Blob to base64'));

        reader.readAsDataURL(blob);
    });
}

export function downloadBlob(
    blob: Blob,
    filename: string,
    fallbackContentType = 'application/octet-stream',
): void {
    const contentType = blob.type || fallbackContentType;
    const url = URL.createObjectURL(new Blob([blob], { type: contentType }));
    const link = a({ href: url, download: filename });
    body(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function textToBlob(text: any, encoding = 'utf-8'): Blob {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(text);
    return new Blob([uint8Array], { type: `text/plain;charset=${encoding}` });
}

export function mergeBlobs(
    blobs: Blob[],
    contentType = 'application/octet-stream',
    bufferSize = 1024,
): Blob {
    const blobBuffers = blobs.map((blob) => blob.slice(0, bufferSize));
    return new Blob(blobBuffers, { type: contentType });
}

export async function encryptBlob(blob: Blob, key: CryptoKey): Promise<Blob> {
    const arrayBuffer = await blob.arrayBuffer();
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        arrayBuffer,
    );
    return new Blob([iv, encryptedData], { type: blob.type });
}

export async function decryptBlob(
    encryptedBlob: Blob,
    key: CryptoKey,
): Promise<Blob> {
    const arrayBuffer = await encryptedBlob.arrayBuffer();
    const iv = arrayBuffer.slice(0, 12); // Extract IV from the first 12 bytes
    const encryptedData = arrayBuffer.slice(12); // Rest is encrypted content

    const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        encryptedData,
    );
    return new Blob([decryptedData], { type: encryptedBlob.type });
}

export function chunkBlob(blob: Blob, chunkSize: number): Blob[] {
    const chunks: Blob[] = [];
    let offset = 0;

    while (offset < blob.size) {
        const chunk = blob.slice(offset, offset + chunkSize);
        chunks.push(chunk);
        offset += chunkSize;
    }
    return chunks;
}

export async function readBlobAsText(
    blob: Blob,
    encoding = 'utf-8',
): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read Blob as text'));
        reader.readAsText(blob, encoding);
    });
}

export function verifyBlob(
    blob: Blob,
    options: VerifyBlobOptions = {},
): boolean {
    if (options.maxSize && blob.size > options.maxSize) {
        return false;
    }
    if (options.allowedTypes && !options.allowedTypes.includes(blob.type)) {
        return false;
    }
    return true;
}

export async function blobToHex(blob: Blob): Promise<string> {
    const arrayBuffer = await blob.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);
    const hexString = Array.from(byteArray)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    return hexString;
}
