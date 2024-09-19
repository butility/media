export * from '@/core/blob';
import {
    blobToHex,
    chunkBlob,
    convertBase64ToBlob,
    convertBlobToBase64,
    decryptBlob,
    downloadBlob,
    encryptBlob,
    mergeBlobs,
    readBlobAsText,
    textToBlob,
    verifyBlob
} from '@/core/blob';

const Blob = {
    blobToHex,
    chunkBlob,
    convertBase64ToBlob,
    convertBlobToBase64,
    decryptBlob,
    downloadBlob,
    encryptBlob,
    mergeBlobs,
    readBlobAsText,
    textToBlob,
    verifyBlob
}

export default Blob;