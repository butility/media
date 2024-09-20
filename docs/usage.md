# Usage

Here are some basic examples of how to use the Media package.

## Camera Module

### Open Camera

To access the device camera:

```javascript
const cameraOptions = { targetElementId: 'camera-container' };
openCamera(cameraOptions)
  .then(stream => {
    // Use the stream
  })
  .catch(error => console.error(error));
```

### Capture Photo

To capture a photo:

```javascript
const photoOptions = {
  targetElementId: 'camera-container',
  fileType: 'jpeg',
};
capturePhoto(photoOptions)
  .then(blob => {
    // Handle the captured photo blob
  })
  .catch(error => console.error(error));
```

## File Module

### Upload File

To upload a file:

```javascript
const fileInput = document.getElementById('file-input');
const file = fileInput.files[0];

uploadFile(file, '/upload-endpoint')
  .then(response => {
    // Handle the response
  })
  .catch(error => console.error(error));
```

## Image Module

### Compress Image

To compress an image file:

```javascript
const compressedImage = await compressImage(file, 0.8);
```

## Audiovisual Module

### Control Playback

To play a video:

```javascript
const videoElement = document.getElementById('video-player');
await controlPlayback(videoElement, 'play');
```