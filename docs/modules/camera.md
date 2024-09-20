### Camera Module

The **Camera Module** provides an easy-to-use interface for capturing photos and recording videos using a device's camera. This module supports a range of video and image file types and allows customization of camera settings for both photo and video capture. It is designed to facilitate camera-related functionalities in web applications, providing seamless interaction with a device’s media capabilities.

#### File Types

- **VideoFileTypes**: Supported video file formats.
  - `"mp4"`, `"webm"`, `"avi"`, `"mkv"`, `"mov"`, `"flv"`, `"wmv"`, `"m4v"`, `"ogg"`
  
- **ImageFileTypes**: Supported image file formats.
  - `"jpeg"`, `"jpg"`, `"png"`, `"gif"`, `"bmp"`, `"tiff"`, `"svg+xml"`

---

#### Interfaces

- **CameraOptions**
  - **targetElementId** (string, required): The ID of the HTML element where the camera stream will be displayed.

- **PhotoCaptureOptions** (extends `CameraOptions`)
  - **fileType** (`ImageFileTypes`, required): The format of the photo to be captured.

- **VideoRecordOptions** (extends `CameraOptions`)
  - **duration** (number, required): The duration (in seconds) for the video recording.
  - **fileType** (`VideoFileTypes`, required): The format of the video to be recorded.
  - **start** (function, required): A callback function to handle the start of the video recording.
  - **stop** (function, required): A callback function to handle the stop of the video recording.
  - **removeAudio** (boolean, optional): If set to `true`, the audio track will be removed from the recording.
  - **removeVideo** (boolean, optional): If set to `true`, the video track will be removed from the recording.

---

#### Namespace: `Camera`

The `Camera` namespace contains the following exported functions to manage camera functionality:

---

### **Functions:**

#### **1. capturePhoto(options: PhotoCaptureOptions): Promise<Blob | null>**
- **Description**: Captures a photo from the device’s camera and returns the image as a `Blob` in the specified format.
- **Parameters**:
  - `options` (PhotoCaptureOptions, required): Configuration options, including target element and file type.
- **Returns**: A `Promise` that resolves to a `Blob` representing the captured photo, or `null` if the capture fails.

#### **2. openCamera(options: CameraOptions): Promise<MediaStream>**
- **Description**: Opens the device’s camera and streams the video feed to the specified HTML element.
- **Parameters**:
  - `options` (CameraOptions, required): Configuration options for the camera, including the target element where the stream will be displayed.
- **Returns**: A `Promise` that resolves to a `MediaStream` representing the camera feed.

#### **3. recordVideo(options: VideoRecordOptions): Promise<Blob>**
- **Description**: Records a video using the device’s camera for the specified duration and returns the video as a `Blob` in the specified format.
- **Parameters**:
  - `options` (VideoRecordOptions, required): Configuration options for recording video, including duration, file type, and callback functions to handle recording actions.
- **Returns**: A `Promise` that resolves to a `Blob` representing the recorded video.

---

#### Default Export:
- The `Camera` namespace is exported as the default module, making it simple to access all camera-related functions.