import * as Request from '@/utils/request';
import { downloadBlob } from '@/core/blob';
import type { ZipData, CentralDirectory } from '@/types/media';

export function validateFileType(
    file: File,
    allowedTypes: string[],
    allowedExtensions: string[],
): boolean {
    const fileType = file.type;
    const fileName = file.name;
    const fileExtension = fileName
        .substring(fileName.lastIndexOf('.') + 1)
        .toLowerCase(); // Extract extension

    const mimeTypeValid = allowedTypes.some((typePattern) => {
        const regex = new RegExp(`^${typePattern.replace('*', '.*')}$`); // Convert wildcard to regex
        return regex.test(fileType);
    });

    const extensionValid = allowedExtensions.includes(fileExtension);

    if (!mimeTypeValid || !extensionValid) {
        console.error(
            `File type or extension not allowed. Got type: ${fileType}, extension: ${fileExtension}`,
        );
        return false;
    }

    return true;
}

export function validateFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
}

export function uploadFile(file: File, url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        Request.post(url, formData, (response: any) => {
            if (response) {
                resolve(response);
            } else {
                reject(new Error('File upload failed'));
            }
        });
    });
}

export async function downloadFile(fileUrl: string, fileName: string, fileType?: string): Promise<any> {
    return new Promise((resolve, reject) => {
        Request.get(fileUrl, (response: any) => {
            if (response) {
                const blob = new Blob([response], fileType ? { type: fileType } : {});
                downloadBlob(blob, fileName);
                resolve(response);
            } else {
                reject(new Error(`Failed to download file.`));
            }
        });
    });
}

export async function unzip(zipBlob: Blob): Promise<File[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const extractedFiles: File[] = [];

            try {
                const view = new DataView(arrayBuffer);
                let offset = 0;

                while (offset < view.byteLength) {
                    const signature = view.getUint32(offset, true); // little-endian

                    // 0x04034b50 is the local file header signature for ZIP files
                    if (signature !== 0x04034b50) {
                        throw new Error('Invalid ZIP file format.');
                    }
                
                    const fileNameLength = view.getUint16(offset + 26, true);
                    const extraFieldLength = view.getUint16(offset + 28, true);

                    const fileNameStart = offset + 30;
                    const fileName = new TextDecoder().decode(
                        new Uint8Array(
                            arrayBuffer,
                            fileNameStart,
                            fileNameLength,
                        ),
                    );

                    // Move to the file content (skip extra fields)
                    const compressedSize = view.getUint32(offset + 18, true);
                    const fileDataStart =
                        fileNameStart + fileNameLength + extraFieldLength;
                    const fileDataEnd = fileDataStart + compressedSize;

                    // Extract and decompress file content if needed
                    const compressionMethod = view.getUint16(offset + 8, true);
                    let fileContent: ArrayBuffer;

                    if (compressionMethod === 0) {
                        // No compression
                        fileContent = arrayBuffer.slice(
                            fileDataStart,
                            fileDataEnd,
                        );
                    } else if (compressionMethod === 8) {
                        // DEFLATE compression
                        const compressedData = arrayBuffer.slice(
                            fileDataStart,
                            fileDataEnd,
                        );
                        fileContent = await decompressDEFLATE(compressedData);
                    } else {
                        throw new Error(
                            `Unsupported compression method: ${compressionMethod}`,
                        );
                    }

                    extractedFiles.push(new File([fileContent], fileName));

                    // Move to the next file
                    offset = fileDataEnd;
                }

                resolve(extractedFiles);
            } catch (error) {
                reject(
                    new Error(
                        `Failed to parse ZIP file: ${(error as Error).message}`,
                    ),
                );
            }
        };

        reader.onerror = () => {
            reject(new Error('Error reading ZIP Blob.'));
        };

        reader.readAsArrayBuffer(zipBlob);
    });
}

export async function decompressDEFLATE(
    compressedData: ArrayBuffer,
): Promise<ArrayBuffer> {
    const decompressedChunks: Uint8Array[] = [];

    if (typeof DecompressionStream === 'undefined') {
        throw new Error(
            'DecompressionStream is not supported in this browser.',
        );
    }

    const decompressionStream = new DecompressionStream('deflate');
    const writer = decompressionStream.writable.getWriter();
    const reader = decompressionStream.readable.getReader();

    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(new Uint8Array(compressedData));
            controller.close();
        },
    });

    await stream.pipeTo(decompressionStream.writable);

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) decompressedChunks.push(value);
    }

    const totalLength = decompressedChunks.reduce(
        (sum, chunk) => sum + chunk.length,
        0,
    );
    const decompressedArray = new Uint8Array(totalLength);

    let offset = 0;
    for (const chunk of decompressedChunks) {
        decompressedArray.set(chunk, offset);
        offset += chunk.length;
    }

    return decompressedArray.buffer;
}

export async function zip(files: File[], zipFileName: string): Promise<Blob> {
    const zipData: ZipData[] = [];

    for (const file of files) {
        const content = new Uint8Array(await file.arrayBuffer());
        zipData.push({
            name: file.name,
            content,
            contentLength: content.length,
        });
    }

    const centralDirectory: CentralDirectory[] = [];
    let currentOffset = 0;

    // Collect central directory information
    zipData.forEach((file) => {
        centralDirectory.push({
            name: file.name,
            offset: currentOffset,
            contentLength: file.contentLength,
        });
        currentOffset += file.contentLength;
    });

    const zipArray: Uint8Array[] = [];

    zipData.forEach((file) => {
        const header = new Uint8Array([
            0x50,
            0x4b,
            0x03,
            0x04, // local file header signature
            0x0a,
            0x00, // version needed to extract
            0x00,
            0x00, // general purpose bit flag
            0x00,
            0x00, // compression method (0 = store)
            0x00,
            0x00,
            0x00,
            0x00, // file modification time/date
            0x00,
            0x00,
            0x00,
            0x00,
            file.contentLength & 0xff,
            (file.contentLength >> 8) & 0xff, // compressed size
            file.contentLength & 0xff,
            (file.contentLength >> 8) & 0xff, // uncompressed size
            file.name.length & 0xff,
            (file.name.length >> 8) & 0xff, // file name length
            0x00,
            0x00, // extra field length
        ]);

        const nameEncoded = new TextEncoder().encode(file.name);

        const localFileHeader = new Uint8Array(
            header.length + nameEncoded.length + file.content.length,
        );
        localFileHeader.set(header);
        localFileHeader.set(nameEncoded, header.length);
        localFileHeader.set(file.content, header.length + nameEncoded.length);

        zipArray.push(localFileHeader);
    });

    const centralDirectoryArray: Uint8Array[] = [];

    centralDirectory.forEach((file) => {
        const header = new Uint8Array([
            0x50,
            0x4b,
            0x01,
            0x02, // central file header signature
            0x0a,
            0x00, // version made by
            0x0a,
            0x00, // version needed to extract
            0x00,
            0x00, // general purpose bit flag
            0x00,
            0x00, // compression method
            0x00,
            0x00,
            0x00,
            0x00, // file modification time/date
            0x00,
            0x00,
            0x00,
            0x00, // CRC-32
            file.contentLength & 0xff,
            (file.contentLength >> 8) & 0xff, // compressed size
            file.contentLength & 0xff,
            (file.contentLength >> 8) & 0xff, // uncompressed size
            file.name.length & 0xff,
            (file.name.length >> 8) & 0xff, // file name length
            0x00,
            0x00, // extra field length
            0x00,
            0x00, // file comment length
            0x00,
            0x00, // disk number start
            0x00,
            0x00, // internal file attributes
            0x00,
            0x00,
            0x00,
            0x00, // external file attributes
            file.offset & 0xff,
            (file.offset >> 8) & 0xff,
            (file.offset >> 16) & 0xff,
            (file.offset >> 24) & 0xff, // relative offset of local header
        ]);

        const nameEncoded = new TextEncoder().encode(file.name);
        const centralFileHeader = new Uint8Array(
            header.length + nameEncoded.length,
        );
        centralFileHeader.set(header);
        centralFileHeader.set(nameEncoded, header.length);

        centralDirectoryArray.push(centralFileHeader);
    });

    const endOfCentralDirectory = new Uint8Array([
        0x50,
        0x4b,
        0x05,
        0x06, // end of central directory signature
        0x00,
        0x00, // number of this disk
        0x00,
        0x00, // disk where central directory starts
        centralDirectory.length & 0xff,
        (centralDirectory.length >> 8) & 0xff, // total number of entries on this disk
        centralDirectory.length & 0xff,
        (centralDirectory.length >> 8) & 0xff, // total number of entries overall
        centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) &
            0xff, // size of central directory
        currentOffset & 0xff,
        (currentOffset >> 8) & 0xff,
        (currentOffset >> 16) & 0xff,
        (currentOffset >> 24) & 0xff, // offset of start of central directory
        0x00,
        0x00, // zip file comment length
    ]);

    // Combine all parts into a single Uint8Array
    const totalLength =
        zipArray.reduce((acc, entry) => acc + entry.length, 0) +
        centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) +
        endOfCentralDirectory.length;

    const zipFile = new Uint8Array(totalLength);

    currentOffset = 0;
    zipArray.forEach((entry) => {
        zipFile.set(entry, currentOffset);
        currentOffset += entry.length;
    });

    centralDirectoryArray.forEach((entry) => {
        zipFile.set(entry, currentOffset);
        currentOffset += entry.length;
    });

    zipFile.set(endOfCentralDirectory, currentOffset);

    const zipBlob = new Blob([zipFile], { type: 'application/zip' });
    downloadBlob(zipBlob, zipFileName);

    return zipBlob;
}
