import type {
    CameraOptions,
    PhotoCaptureOptions,
    VideoRecordOptions,
} from '@/types/media';

export function openCamera(
    options: CameraOptions = {
        targetElementId: 'camera',
    },
): Promise<MediaStream> {
    const { targetElementId } = options;

    return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(
            targetElementId,
        ) as HTMLVideoElement;

        if (!videoElement) {
            reject(new Error(`Element with ID ${targetElementId} not found.`));
            return;
        }

        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoElement.srcObject = stream;
                resolve(stream);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function capturePhoto(
    options: PhotoCaptureOptions = {
        targetElementId: 'camera',
        fileType: 'png',
    },
): Promise<Blob | null> {
    const { targetElementId } = options;

    return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(
            targetElementId,
        ) as HTMLVideoElement;

        if (!videoElement || !videoElement.srcObject) {
            reject(
                new Error(
                    `Element with ID ${targetElementId} not found or camera not opened.`,
                ),
            );
            return;
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        videoElement.addEventListener('loadedmetadata', () => {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            if (context) {
                context.drawImage(
                    videoElement,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
            }
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
        });

        videoElement.onerror = () => {
            reject(new Error('Error capturing photo.'));
        };
    });
}

export function recordVideo(
    options: VideoRecordOptions = {
        duration: 5,
        targetElementId: 'camera',
        fileType: 'mp4',
    },
): Promise<Blob> {
    const { targetElementId, duration, fileType } = options;

    return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(
            targetElementId,
        ) as HTMLVideoElement;

        if (!videoElement || !videoElement.srcObject) {
            reject(
                new Error(
                    `Element with ID ${targetElementId} not found or camera not opened.`,
                ),
            );
            return;
        }

        const mediaStream = videoElement.srcObject as MediaStream;
        const mediaRecorder = new MediaRecorder(mediaStream, {
            mimeType: `video/${fileType}`,
        });

        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(chunks, { type: 'video/webm' });
            resolve(videoBlob);
        };

        mediaRecorder.start();

        setTimeout(() => {
            mediaRecorder.stop();
        }, duration); // Default recording duration is 5 seconds
    });
}
