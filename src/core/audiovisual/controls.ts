import type { PlaybackActions, VolumeActions } from '@/types/media';

export function controlPlayback(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    action: PlaybackActions,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        switch (action) {
            case 'play':
                if (videoElement.paused) {
                    videoElement
                        .play()
                        .then(() => resolve())
                        .catch((error) =>
                            reject(
                                new Error(
                                    'Error attempting to play the video: ' +
                                        error.message,
                                ),
                            ),
                        );
                } else {
                    // Video is already playing
                    resolve();
                }
                break;
            case 'pause':
                if (!videoElement.paused) {
                    videoElement.pause();
                    resolve();
                } else {
                    // Video is already paused
                    resolve();
                }
                break;
            case 'toggle':
                if (videoElement.paused) {
                    videoElement
                        .play()
                        .then(() => resolve())
                        .catch((error) =>
                            reject(
                                new Error(
                                    'Error attempting to play the video: ' +
                                        error.message,
                                ),
                            ),
                        );
                } else {
                    videoElement.pause();
                    resolve();
                }
                break;
            default:
                reject(
                    new Error(
                        'Invalid action. Use "play", "pause", or "toggle".',
                    ),
                );
                break;
        }
    });
}

export function controlVolume(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    action: VolumeActions,
    volumeLevel?: number,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        switch (action) {
            case 'setVolume':
                // Validate the volumeLevel parameter
                if (
                    typeof volumeLevel !== 'number' ||
                    isNaN(volumeLevel) ||
                    volumeLevel < 0 ||
                    volumeLevel > 1
                ) {
                    return reject(
                        new Error(
                            'Invalid volumeLevel. Must be a number between 0 and 1.',
                        ),
                    );
                }
                videoElement.volume = volumeLevel;
                videoElement.muted = false; // the video must not be muted
                resolve();
                break;

            case 'mute':
                videoElement.muted = true;
                resolve();
                break;

            case 'unmute':
                videoElement.muted = false;
                resolve();
                break;

            case 'toggleMute':
                videoElement.muted = !videoElement.muted;
                resolve();
                break;

            default:
                reject(
                    new Error(
                        'Invalid action. Use "setVolume", "mute", "unmute", or "toggleMute".',
                    ),
                );
                break;
        }
    });
}
