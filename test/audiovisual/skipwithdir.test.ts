import { skipWithDir } from '../../src/core/audiovisual';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('skipWithDir', () => {
    let videoElement: HTMLVideoElement;

    beforeEach(() => {
        videoElement = document.createElement('video');
        Object.defineProperty(videoElement, 'duration', { value: 120, writable: false });
        videoElement.currentTime = 60;
    });

    it('should skip forward by the specified number of seconds', async () => {
        await skipWithDir(videoElement, 10, 'forward');
        expect(videoElement.currentTime).toBe(70);
    });

    it('should skip backward by the specified number of seconds', async () => {
        await skipWithDir(videoElement, 20, 'backward');
        expect(videoElement.currentTime).toBe(40);
    });

    it('should not skip beyond the video duration', async () => {
        await skipWithDir(videoElement, 100, 'forward');
        expect(videoElement.currentTime).toBe(120);
    });

    it('should not skip before 0', async () => {
        await skipWithDir(videoElement, 100, 'backward');
        expect(videoElement.currentTime).toBe(0);
    });

    it('should reject if direction is invalid', async () => {
        await expect(skipWithDir(videoElement, 10, 'upward' as any)).rejects.toThrow(
            'Invalid direction. Use "forward" or "backward".'
        );
    });
});
