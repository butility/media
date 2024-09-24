export * from '@/core/file/load';
export * from '@/core/file/validate';
export * from '@/core/file/zip';
import { decompressDEFLATE, unzip, zip } from '@/core/file/zip';
import { uploadFile, downloadFile } from '@/core/file/load';
import { validateFileSize, validateFileType } from '@/core/file/validate';

const File = {
    decompressDEFLATE,
    downloadFile,
    unzip,
    uploadFile,
    validateFileSize,
    validateFileType,
    zip,
};

export default File;
