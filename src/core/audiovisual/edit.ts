import { source } from '@butility/dom/html';
import { setAttribute } from '@butility/dom/attribute';
import type {
    MediaToneOptions,
    VideoFileTypes,
    AudioFileTypes,
} from '@/types/media';

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

        const sourceElement = source({ src: sourceUrl, type: type });
        setAttribute(videoElement, { innerHTML: '' });
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
