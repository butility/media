import { controlVolume } from '../../src/core/audiovisual';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('controlVolume', () => {
    let videoElement: HTMLVideoElement;

    beforeEach(() => {
        videoElement = document.createElement('video');
    });

    it('should set the volume to a valid level', async () => {
        await controlVolume(videoElement, 'setVolume', 0.5);
        expect(videoElement.volume).toBe(0.5);
        expect(videoElement.muted).toBe(false);
    });

    it('should mute the video', async () => {
        await controlVolume(videoElement, 'mute');
        expect(videoElement.muted).toBe(true);
    });

    it('should unmute the video', async () => {
        await controlVolume(videoElement, 'unmute');
        expect(videoElement.muted).toBe(false);
    });

    it('should toggle mute on the video', async () => {
        videoElement.muted = false;
        await controlVolume(videoElement, 'toggleMute');
        expect(videoElement.muted).toBe(true);
    });

    it('should reject if volume level is invalid', async () => {
        await expect(controlVolume(videoElement, 'setVolume', -1)).rejects.toThrow(
            'Invalid volumeLevel. Must be a number between 0 and 1.'
        );
    });
});
