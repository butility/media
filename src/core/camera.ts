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
    const { targetElementId, fileType } = options;

    return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(
            targetElementId,
        ) as HTMLVideoElement;

        if (!videoElement) {
            reject(new Error(`Element with ID ${targetElementId} not found.`));
            return;
        }

        // Request camera access
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((mediaStream) => {
                videoElement.srcObject = mediaStream;

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                videoElement.addEventListener('loadedmetadata', () => {
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;

                    if (context) {
                        // Draw the current video frame to the canvas
                        context.drawImage(
                            videoElement,
                            0,
                            0,
                            canvas.width,
                            canvas.height,
                        );

                        // Capture the image as a blob with the specified fileType (png, jpeg, webp)
                        canvas.toBlob((blob) => {
                            resolve(blob);

                            // Stop the media stream to release the camera
                            mediaStream
                                .getTracks()
                                .forEach((track) => track.stop());
                        }, `image/${fileType}`);
                    } else {
                        reject(new Error('Failed to get canvas 2D context.'));
                    }
                });

                videoElement.onerror = () => {
                    reject(new Error('Error capturing photo.'));
                };
            })
            .catch((error) => {
                reject(new Error('Unable to access camera: ' + error.message));
            });
    });
}

export function recordVideo(
    options: VideoRecordOptions = {
        targetElementId: 'camera',
        fileType: 'webm',
        start: (startRecording) => startRecording(),
        stop: (mediaRecorder) => mediaRecorder.stop(),
        removeAudio: false,
        removeVideo: false,
    },
): Promise<Blob> {
    const {
        targetElementId,
        duration,
        fileType,
        start,
        stop,
        removeAudio,
        removeVideo,
    } = options;

    return new Promise((resolve, reject) => {
        const startRecording = () => {
            navigator.mediaDevices
                .getUserMedia({
                    video: !removeVideo,
                    audio: !removeAudio,
                })
                .then((stream) => {
                    const mediaStream = stream;
                    const videoElement = document.getElementById(
                        targetElementId,
                    ) as HTMLVideoElement | HTMLAudioElement;

                    if (!videoElement) {
                        reject(
                            new Error(
                                `Element with ID ${targetElementId} not found or camera not opened.`,
                            ),
                        );
                        return;
                    }

                    videoElement.srcObject = mediaStream;
                    videoElement.muted = true; // To mute the video element

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
                        const videoBlob = new Blob(chunks, {
                            type: `video/${fileType}`,
                        });
                        resolve(videoBlob);

                        // Stop all tracks after recording
                        mediaStream
                            .getTracks()
                            .forEach((track) => track.stop());
                    };

                    // Start recording
                    mediaRecorder.start();

                    // Stop recording after duration or via stop callback
                    if (duration) {
                        setTimeout(() => {
                            mediaRecorder.stop();
                        }, duration);
                    } else {
                        stop(mediaRecorder);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        };

        start(startRecording);
    });
}
