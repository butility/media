
// Shared
export type VideoFileTypes = "mp4" | "webm" | "avi" | "mkv" | "mov" | "flv" | "wmv" | "m4v" | "ogg";
export type AudioFileTypes = "mp3" | "wav" | "ogg" | "aac" | "flac" | "m4a" | "wma" | "alac" | "aiff";

// Blob
export interface VerifyBlobOptions { 
    maxSize?: number; 
    allowedTypes?: string[] 
}

// camera
export interface CameraOptions {
    targetElementId: string;
}

export interface PhotoCaptureOptions extends CameraOptions {
    fileType: "jpeg" | "jpg" | "png" | "gif" | "bmp" | "tiff" | "svg+xml";
}

export interface VideoRecordOptions extends CameraOptions { 
    duration?: number;
    fileType: VideoFileTypes;
    start: (MediaRecorder: Function) => void;
    stop: (MediaRecorder: MediaRecorder) => void;
    removeAudio?: boolean,
    removeVideo?: boolean
}

// file
export interface ZipData {
    name: string;
    content: any;
    contentLength: number;
}

export interface CentralDirectory {
    name: string;
    offset: number;
    contentLength: number;
}

// Image
export type Axis = "horizontal" | "vertical";

export interface Coordinates { 
    width: number; 
    height: number;
    x: number; 
    y: number; 
}

// Audiovisual
export type PlaybackActions = "play" | "pause" | "toggle";
export type Direction = "forward" | "backward";
export type VolumeActions = 'setVolume' | 'mute' | 'unmute' | 'toggleMute';

export interface MediaEventCallback {
    onPlay?: () => void;
    onPause?: () => void;
    onTimeUpdate?: (currentTime: number) => void;
    onEnd?: () => void;
}

export interface MediaToneOptions {
    brightness?: number | null;
    contrast?: number | null;
    saturation?: number | null;
    filter?: string | null;
}