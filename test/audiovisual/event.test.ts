import { registerVideoEvents } from '../../src/core/audiovisual';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('registerVideoEvents', () => {
    let videoElement: HTMLVideoElement;
    const onPlay = jest.fn();
    const onPause = jest.fn();

    beforeEach(() => {
        videoElement = document.createElement('video');
        // Mock the addEventListener method to store the callbacks
        videoElement.addEventListener = jest.fn((eventType, callback) => {
            (videoElement as any)[eventType as any] = callback; // Store callback on videoElement
        });
    });

    it('should register all event listeners', async () => {
        // Register the events
        await registerVideoEvents(videoElement, {
            onPlay,
            onPause,
        });

        // Manually call the registered event handlers
        const playHandler = (videoElement as any)['play'];
        const pauseHandler = (videoElement as any)['pause'];

        // Simulate dispatching events
        if (playHandler) playHandler(); // Call the play event handler
        if (pauseHandler) pauseHandler(); // Call the pause event handler

        // Check if event handlers are called
        expect(onPlay).toHaveBeenCalled();
        expect(onPause).toHaveBeenCalled();
    });
});