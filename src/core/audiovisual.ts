import type {
    PlaybackActions,
    Direction,
    VolumeActions,
    VideoFileTypes,
    AudioFileTypes,
    MediaEventCallback,
    MediaToneOptions,
} from '@/types/media';

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

export function updateVideoSourceAndResolution(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    sourceUrl: string,
    type: VideoFileTypes | AudioFileTypes,
    resolution?: string,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (typeof sourceUrl !== 'string' || !sourceUrl.trim()) {
            return reject(
                new Error('Invalid sourceUrl. Must be a non-empty string.'),
            );
        }

        const validTypes = [
            'video/mp4',
            'video/webm',
            'video/avi',
            'video/mkv',
            'video/mov',
            'video/flv',
            'video/wmv',
            'video/m4v',
            'video/ogg',
        ];

        if (!validTypes.includes(`video/${type}`)) {
            return reject(
                new Error(
                    'Invalid type. Must be one of the following: "mp4", "webm", "avi", "mkv", "mov", "flv", "wmv", "m4v", "ogg"',
                ),
            );
        }

        // Validate the resolution parameter if provided
        let width: number | undefined;
        let height: number | undefined;
        if (resolution) {
            if (
                typeof resolution !== 'string' ||
                !/^\d+x\d+$/.test(resolution)
            ) {
                return reject(
                    new Error(
                        'Invalid resolution format. Must be in the format "widthxheight" (e.g., "1920x1080").',
                    ),
                );
            }
            [width, height] = resolution.split('x').map(Number);
            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                return reject(
                    new Error(
                        'Invalid resolution values. Width and height must be positive numbers.',
                    ),
                );
            }
        }

        const sourceElement = document.createElement('source');
        sourceElement.src = sourceUrl;
        sourceElement.type = type;

        videoElement.innerHTML = '';
        videoElement.appendChild(sourceElement);
        videoElement.load();

        // set the resolution
        if (width && height) {
            videoElement.style.width = `${width}px`;
            videoElement.style.height = `${height}px`;
        }

        // Wait for the video to load
        videoElement.oncanplay = () => {
            resolve();
        };

        videoElement.onerror = (error: any) => {
            reject(
                new Error('Error loading the video source: ' + error.message),
            );
        };
    });
}

export function toggleCaptions(
    videoElement: HTMLVideoElement | HTMLAudioElement,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (!videoElement.textTracks) {
            return reject(
                new Error('The video element does not support text tracks.'),
            );
        }

        // Toggle captions
        try {
            const textTracks = Array.from(videoElement.textTracks);
            const hasVisibleCaptions = textTracks.some(
                (track) => track.mode === 'showing',
            );

            if (hasVisibleCaptions) {
                textTracks.forEach((track) => (track.mode = 'hidden'));
                console.log('Captions turned off.');
            } else {
                textTracks.forEach((track) => (track.mode = 'showing'));
                console.log('Captions turned on.');
            }

            resolve();
        } catch (error: any) {
            reject(new Error('Error toggling captions: ' + error.message));
        }
    });
}

export function setCaptionTrack(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    trackIndex: number,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        // Check if the video element has text tracks
        if (!videoElement.textTracks) {
            return reject(
                new Error('The video element does not support text tracks.'),
            );
        }

        const textTracks = Array.from(videoElement.textTracks);

        if (trackIndex < 0 || trackIndex >= textTracks.length) {
            return reject(
                new Error(
                    'Invalid trackIndex. It must be within the range of available tracks.',
                ),
            );
        }

        try {
            textTracks.forEach((track, index) => {
                track.mode = index === trackIndex ? 'showing' : 'hidden';
            });

            console.log(`Caption track set to index ${trackIndex}.`);
            resolve();
        } catch (error: any) {
            reject(new Error('Error setting caption track: ' + error.message));
        }
    });
}

export function getAvailableCaptionTracks(
    videoElement: HTMLVideoElement | HTMLAudioElement,
): Promise<TextTrack[]> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (!videoElement.textTracks) {
            return reject(
                new Error('The video element does not support text tracks.'),
            );
        }

        try {
            const textTracks = Array.from(videoElement.textTracks);
            const availableTracks = textTracks.filter(
                (track) =>
                    track.kind === 'subtitles' || track.kind === 'captions',
            );

            console.log(`Available caption tracks: ${availableTracks.length}`);
            resolve(availableTracks);
        } catch (error: any) {
            reject(
                new Error('Error retrieving caption tracks: ' + error.message),
            );
        }
    });
}

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

export function videoTones(
    videoElement: HTMLVideoElement | HTMLAudioElement,
    options: MediaToneOptions,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(videoElement instanceof HTMLVideoElement)) {
            return reject(
                new Error(
                    'The provided element is not a valid HTMLVideoElement.',
                ),
            );
        }

        if (typeof options !== 'object' || Array.isArray(options)) {
            return reject(
                new Error('Invalid options object. Must be a plain object.'),
            );
        }

        const applyCSSProperty = (
            property: keyof CSSStyleDeclaration,
            value: any,
            defaultValue: any,
        ): void => {
            if (value === null) {
                videoElement.style[property as any] = defaultValue;
            } else {
                videoElement.style[property as any] = value;
            }
        };

        try {
            if (options.brightness !== undefined) {
                applyCSSProperty(
                    'filter',
                    `brightness(${options.brightness})`,
                    'none',
                );
            }

            if (options.contrast !== undefined) {
                applyCSSProperty(
                    'filter',
                    `contrast(${options.contrast})`,
                    'none',
                );
            }

            if (options.saturation !== undefined) {
                applyCSSProperty(
                    'filter',
                    `saturate(${options.saturation})`,
                    'none',
                );
            }

            if (options.filter !== undefined) {
                if (typeof options.filter !== 'string') {
                    return reject(new Error('filter must be a string.'));
                }
                videoElement.style.filter = options.filter;
            }

            // Apply combined filter settings if any
            const filterParts = [];
            if (options.brightness !== undefined)
                filterParts.push(`brightness(${options.brightness})`);
            if (options.contrast !== undefined)
                filterParts.push(`contrast(${options.contrast})`);
            if (options.saturation !== undefined)
                filterParts.push(`saturate(${options.saturation})`);
            if (options.filter) filterParts.push(options.filter);

            if (filterParts.length > 0) {
                videoElement.style.filter = filterParts.join(' ');
            }

            resolve();
        } catch (error: any) {
            reject(
                new Error('Error applying video adjustments: ' + error.message),
            );
        }
    });
}
