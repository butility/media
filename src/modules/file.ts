export * from '@/core/file';
import {
    decompressDEFLATE,
    downloadFile,
    unzip,
    uploadFile,
    validateFileSize,
    validateFileType,
    zip,
} from '@/core/file';

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
