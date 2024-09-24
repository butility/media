import type { Direction } from '@/types/media';

export function seekTo(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    timeInSeconds: number,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (
            typeof timeInSeconds !== 'number' ||
            isNaN(timeInSeconds) ||
            timeInSeconds < 0
        ) {
            return reject(
                new Error(
                    'Invalid timeInSeconds. Must be a non-negative number.',
                ),
            );
        }

        if (isNaN(videoElement.duration)) {
            return reject(
                new Error(
                    'The video duration is not available. Ensure the video metadata has loaded.',
                ),
            );
        }

        const seekTime = Math.min(
            Math.max(timeInSeconds, 0),
            videoElement.duration,
        );

        try {
            videoElement.currentTime = seekTime;
            resolve();
        } catch (error: any) {
            reject(
                new Error(
                    'Error attempting to seek to the specified time: ' +
                        error.message,
                ),
            );
        }
    });
}

export function skipWithDir(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    seconds: number,
    direction: Direction,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (typeof seconds !== 'number' || isNaN(seconds) || seconds <= 0) {
            return reject(
                new Error('Invalid seconds. Must be a positive number.'),
            );
        }

        if (isNaN(videoElement.duration)) {
            return reject(
                new Error(
                    'The video duration is not available. Ensure the video metadata has loaded.',
                ),
            );
        }

        // Calculate the new time based on the direction
        let newTime: number;

        switch (direction) {
            case 'forward':
                newTime = videoElement.currentTime + seconds;
                break;
            case 'backward':
                newTime = videoElement.currentTime - seconds;
                break;
            default:
                return reject(
                    new Error(
                        'Invalid direction. Use "forward" or "backward".',
                    ),
                );
        }

        newTime = Math.max(0, Math.min(newTime, videoElement.duration));
        try {
            videoElement.currentTime = newTime;
            resolve();
        } catch (error: any) {
            reject(
                new Error(
                    'Error attempting to skip to the specified time: ' +
                        error.message,
                ),
            );
        }
    });
}
