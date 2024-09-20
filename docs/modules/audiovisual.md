### Audiovisual Media Control Module

The **Audiovisual Media Control Module** provides a comprehensive set of functions for managing media playback, volume control, captions, video effects, and media sources in both video and audio elements. This module supports various media formats and allows developers to create rich media experiences with flexible control over playback, tone adjustments, and caption management.

#### Types

- **PlaybackActions**: Actions that can be performed on media playback.
  - `"play"`, `"pause"`, `"toggle"`
  
- **Direction**: Defines the direction for skipping media playback.
  - `"forward"`, `"backward"`
  
- **VolumeActions**: Actions that control the media volume.
  - `"setVolume"`, `"mute"`, `"unmute"`, `"toggleMute"`
  
- **VideoFileTypes**: Supported video file formats.
  - `"mp4"`, `"webm"`, `"avi"`, `"mkv"`, `"mov"`, `"flv"`, `"wmv"`, `"m4v"`, `"ogg"`
  
- **AudioFileTypes**: Supported audio file formats.
  - `"mp3"`, `"wav"`, `"ogg"`, `"aac"`, `"flac"`, `"m4a"`, `"wma"`, `"alac"`, `"aiff"`

---

#### Interfaces

- **MediaEventCallback**
  - **onPlay** (function, optional): Callback triggered when media is played.
  - **onPause** (function, optional): Callback triggered when media is paused.
  - **onTimeUpdate** (function, optional): Callback triggered on media time update, receiving the current time in seconds.
  - **onEnd** (function, optional): Callback triggered when media playback ends.

- **MediaToneOptions**
  - **brightness** (number | null, optional): Adjust the brightness of the media.
  - **contrast** (number | null, optional): Adjust the contrast of the media.
  - **saturation** (number | null, optional): Adjust the saturation of the media.
  - **filter** (string | null, optional): Apply a custom CSS filter string to the media.

---

#### Namespace: `Audiovisual`

The `Audiovisual` namespace contains the following exported functions to handle media playback, volume control, and more:

---

### **Functions:**

#### **1. controlPlayback(videoElement: HTMLVideoElement | HTMLAudioElement, action: PlaybackActions): Promise<void>**
- **Description**: Controls the media playback, allowing for play, pause, or toggling between the two.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to control.
  - `action` (PlaybackActions, required): The playback action (`"play"`, `"pause"`, or `"toggle"`).
- **Returns**: A `Promise` that resolves when the action is completed.

#### **2. controlVolume(videoElement: HTMLVideoElement | HTMLAudioElement, action: VolumeActions, volumeLevel?: number): Promise<void>**
- **Description**: Controls the volume of the media, allowing for setting the volume, muting, unmuting, or toggling mute.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to control.
  - `action` (VolumeActions, required): The volume control action (`"setVolume"`, `"mute"`, `"unmute"`, or `"toggleMute"`).
  - `volumeLevel` (number, optional): The volume level to set (0 to 1) if the `setVolume` action is used.
- **Returns**: A `Promise` that resolves when the action is completed.

#### **3. getAvailableCaptionTracks(videoElement: HTMLVideoElement | HTMLAudioElement): Promise<TextTrack[]>**
- **Description**: Retrieves the available caption tracks for the media element.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to query.
- **Returns**: A `Promise` that resolves to an array of `TextTrack` objects representing the available caption tracks.

#### **4. registerVideoEvents(videoElement: HTMLVideoElement | HTMLAudioElement, callbacks: MediaEventCallback): Promise<void>**
- **Description**: Registers media event callbacks, such as play, pause, time update, and end events.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to attach events to.
  - `callbacks` (MediaEventCallback, required): An object specifying event handlers.
- **Returns**: A `Promise` that resolves when events are successfully registered.

#### **5. seekTo(videoElement: HTMLVideoElement | HTMLAudioElement, timeInSeconds: number): Promise<void>**
- **Description**: Seeks the media to a specific time in seconds.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to seek.
  - `timeInSeconds` (number, required): The time in seconds to seek to.
- **Returns**: A `Promise` that resolves when the seek operation is completed.

#### **6. setCaptionTrack(videoElement: HTMLVideoElement | HTMLAudioElement, trackIndex: number): Promise<void>**
- **Description**: Sets the active caption track based on the specified track index.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element with captions.
  - `trackIndex` (number, required): The index of the caption track to activate.
- **Returns**: A `Promise` that resolves when the track is set.

#### **7. skipWithDir(videoElement: HTMLVideoElement | HTMLAudioElement, seconds: number, direction: Direction): Promise<void>**
- **Description**: Skips the media forward or backward by a specified number of seconds.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to control.
  - `seconds` (number, required): The number of seconds to skip.
  - `direction` (Direction, required): The direction to skip (`"forward"` or `"backward"`).
- **Returns**: A `Promise` that resolves when the skip action is completed.

#### **8. toggleCaptions(videoElement: HTMLVideoElement | HTMLAudioElement): Promise<void>**
- **Description**: Toggles the captions on or off for the media element.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element with captions.
- **Returns**: A `Promise` that resolves when captions are toggled.

#### **9. updateVideoSourceAndResolution(videoElement: HTMLVideoElement | HTMLAudioElement, sourceUrl: string, type: VideoFileTypes | AudioFileTypes, resolution?: string): Promise<void>**
- **Description**: Updates the media source URL and optionally adjusts the resolution for playback.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to update.
  - `sourceUrl` (string, required): The new media source URL.
  - `type` (VideoFileTypes | AudioFileTypes, required): The type of the media file.
  - `resolution` (string, optional): The desired resolution to set, if applicable.
- **Returns**: A `Promise` that resolves when the source is updated.

#### **10. videoTones(videoElement: HTMLVideoElement | HTMLAudioElement, options: MediaToneOptions): Promise<void>**
- **Description**: Adjusts the visual tones of the video such as brightness, contrast, saturation, and filters.
- **Parameters**:
  - `videoElement` (HTMLVideoElement | HTMLAudioElement, required): The media element to adjust.
  - `options` (MediaToneOptions, required): An object containing tone adjustment options (e.g., brightness, contrast, saturation).
- **Returns**: A `Promise` that resolves when the tone adjustments are applied.

---

#### Default Export:
- The `Audiovisual` namespace is exported by default, providing an easy way to manage all audiovisual functions for media elements.