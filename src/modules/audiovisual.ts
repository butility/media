export * from '@/core/audiovisual/caption';
export * from '@/core/audiovisual/seek';
export * from '@/core/audiovisual/edit';
export * from '@/core/audiovisual/event';
export * from '@/core/audiovisual/controls';
import {
    getAvailableCaptionTracks,
    setCaptionTrack,
    toggleCaptions,
} from '@/core/audiovisual/caption';
import { controlPlayback, controlVolume } from '@/core/audiovisual/controls';
import { skipWithDir, seekTo } from '@/core/audiovisual/seek';
import { registerVideoEvents } from '@/core/audiovisual/event';
import {
    updateVideoSourceAndResolution,
    videoTones,
} from '@/core/audiovisual/edit';

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
