import { videoTones } from '../../src/core/audiovisual';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('videoTones', () => {
    let videoElement: HTMLVideoElement;

    beforeEach(() => {
        videoElement = document.createElement('video');
        videoElement.style.filter = '';
    });

    it('should apply brightness, contrast, and saturation filters correctly', async () => {
        const options = {
            brightness: 1.2,
            contrast: 0.8,
            saturation: 1.5,
        };
        await videoTones(videoElement, options);
        expect(videoElement.style.filter).toContain('brightness(1.2)');
        expect(videoElement.style.filter).toContain('contrast(0.8)');
        expect(videoElement.style.filter).toContain('saturate(1.5)');
    });

    it('should apply custom filter if provided', async () => {
        const options = {
            filter: 'sepia(0.5)',
        };
        await videoTones(videoElement, options);
        expect(videoElement.style.filter).toBe('sepia(0.5)');
    });

    it('should handle multiple filters correctly', async () => {
        const options = {
            brightness: 1.1,
            contrast: 1.2,
            saturation: 1.3,
            filter: 'blur(2px)',
        };
        await videoTones(videoElement, options);
        expect(videoElement.style.filter).toContain('brightness(1.1)');
        expect(videoElement.style.filter).toContain('contrast(1.2)');
        expect(videoElement.style.filter).toContain('saturate(1.3)');
        expect(videoElement.style.filter).toContain('blur(2px)');
    });

    it('should reject if options is not a plain object', async () => {
        await expect(videoTones(videoElement, [] as any)).rejects.toThrow(
            'Invalid options object. Must be a plain object.'
        );
    });

    it('should reject if filter option is not a string', async () => {
        const options = {
            filter: 123 as any,
        };
        await expect(videoTones(videoElement, options)).rejects.toThrow(
            'filter must be a string.'
        );
    });
});
