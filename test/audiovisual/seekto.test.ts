import { seekTo } from '../../src/core/audiovisual';
import { describe, it, expect, beforeEach, test } from '@jest/globals';

describe('seekTo', () => {
    let videoElement: HTMLVideoElement;

    beforeEach(() => {
        // Mock the video element
        videoElement = document.createElement('video');
        Object.defineProperty(videoElement, 'duration', { value: 300 }); // duration of 5 minutes
    });

    test('should seek to the correct time if valid timeInSeconds is provided', async () => {
        await seekTo(videoElement, 150);
        expect(videoElement.currentTime).toBe(150);
    });

    test('should reject if timeInSeconds is negative', async () => {
        await expect(seekTo(videoElement, -10)).rejects.toThrow(
            'Invalid timeInSeconds. Must be a non-negative number.',
        );
    });

    test('should reject if timeInSeconds is NaN', async () => {
        await expect(seekTo(videoElement, NaN)).rejects.toThrow(
            'Invalid timeInSeconds. Must be a non-negative number.',
        );
    });

    test('should seek to the end if timeInSeconds is greater than the duration', async () => {
        await seekTo(videoElement, 1000);
        expect(videoElement.currentTime).toBe(videoElement.duration);
    });

    test('should reject if the provided element is not a valid HTMLVideoElement', async () => {
        const audioElement = document.createElement('audio');
        await expect(seekTo(audioElement, 10)).rejects.toThrow(
            'The provided element is not a valid HTMLVideoElement.',
        );
    });
});
