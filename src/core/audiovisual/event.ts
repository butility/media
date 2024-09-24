
import type { MediaEventCallback } from '@/types/media';

export function registerVideoEvents(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    callbacks: MediaEventCallback,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (typeof callbacks !== 'object' || Array.isArray(callbacks)) {
            return reject(
                new Error('Invalid callbacks object. Must be a plain object.'),
            );
        }

        const attachEventListener = (
            eventType: string,
            callback?: Function,
        ) => {
            if (callback && typeof callback === 'function') {
                videoElement.addEventListener(eventType, (event: Event) => {
                    try {
                        if (eventType === 'timeupdate') {
                            // Pass currentTime to the callback for 'timeupdate' event
                            callback(
                                (event.target as HTMLVideoElement).currentTime,
                            );
                        } else {
                            callback();
                        }
                    } catch (error) {
                        console.error(`Error in ${eventType} callback:`, error);
                    }
                });
            } else if (callback !== undefined) {
                console.warn(
                    `Callback for ${eventType} is not a function or is missing.`,
                );
            }
        };

        try {
            // Attach event listeners
            attachEventListener('play', callbacks.onPlay);
            attachEventListener('pause', callbacks.onPause);
            attachEventListener('timeupdate', callbacks.onTimeUpdate);
            attachEventListener('ended', callbacks.onEnd);

            resolve();
        } catch (error: any) {
            reject(
                new Error(
                    'Error registering video event listeners: ' + error.message,
                ),
            );
        }
    });
}

