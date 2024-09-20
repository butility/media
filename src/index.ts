export * from '@/modules/blob';
export * from '@/modules/camera';
export * from '@/modules/image';
export * from '@/modules/full-screen';
export * from '@/modules/file';
export * from '@/modules/audiovisual';

import Audiovisual, {
    controlPlayback,
    controlVolume,
    getAvailableCaptionTracks,
    registerVideoEvents,
    seekTo,
    setCaptionTrack,
    skipWithDir,
    toggleCaptions,
    updateVideoSourceAndResolution,
    videoTones,
} from '@/modules/audiovisual';

import Blob, {
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
    verifyBlob,
} from '@/modules/blob';

import Camera, {
    capturePhoto,
    openCamera,
    recordVideo,
} from '@/modules/camera';

import File, {
    decompressDEFLATE,
    downloadFile,
    unzip,
    uploadFile,
    validateFileSize,
    validateFileType,
    zip,
} from '@/modules/file';

import FullScreen, {
    detectFullscreenSupport,
    enterFullscreen,
    exitFullscreen,
    getFullscreenElement,
} from '@/modules/full-screen';

import Image, {
    calculateAspectRatio,
    compressImage,
    convertImageToBase64,
    cropImage,
    flipImage,
    preloadImagesWithCallback,
    resizeImage,
    rotateImage,
} from '@/modules/image';

const Media = {
    blobToHex,
    calculateAspectRatio,
    capturePhoto,
    chunkBlob,
    compressImage,
    controlPlayback,
    controlVolume,
    convertBase64ToBlob,
    convertBlobToBase64,
    convertImageToBase64,
    cropImage,
    decompressDEFLATE,
    decryptBlob,
    detectFullscreenSupport,
    downloadBlob,
    downloadFile,
    encryptBlob,
    enterFullscreen,
    exitFullscreen,
    flipImage,
    getAvailableCaptionTracks,
    getFullscreenElement,
    mergeBlobs,
    openCamera,
    preloadImagesWithCallback,
    readBlobAsText,
    recordVideo,
    registerVideoEvents,
    resizeImage,
    rotateImage,
    seekTo,
    setCaptionTrack,
    skipWithDir,
    textToBlob,
    toggleCaptions,
    unzip,
    updateVideoSourceAndResolution,
    uploadFile,
    validateFileSize,
    validateFileType,
    verifyBlob,
    videoTones,
    zip,
};

export default Media;
export { Audiovisual, Blob, Camera, File, FullScreen, Image };
