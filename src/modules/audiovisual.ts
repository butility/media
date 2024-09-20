export * from '@/core/audiovisual';
import {
    controlPlayback,
    controlVolume,
    getAvailableCaptionTracks,
    registerVideoEvents,
    seekTo,
    setCaptionTrack,
    skipWithDir,
    toggleCaptions,
    updateVideoSourceAndResolution,
    videoTones,
} from '@/core/audiovisual';

const Audiovisual = {
    controlPlayback,
    controlVolume,
    getAvailableCaptionTracks,
    registerVideoEvents,
    seekTo,
    setCaptionTrack,
    skipWithDir,
    toggleCaptions,
    updateVideoSourceAndResolution,
    videoTones,
};

export default Audiovisual;
