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
