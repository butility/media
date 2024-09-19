# Butility Media Utils

A comprehensive JavaScript/TypeScript utility library designed for handling various media operations directly in the browser. This package provides functionalities for working with images, video, audio, files, blobs, and camera access, Promise based.

## Some of Features

- **Blob Utilities**: Create and manage Blobs, including downloading them.
- **File Utilities**: Read files as text or convert them to Base64.
- **Image Utilities**: Load, resize, and manipulate images.
- **Video Utilities**: manage video playback.
- **Audio Utilities**: Capture and record audio streams.
- **Camera Utilities**: Take snapshots from the camera.

## Installation

To install the package, you can use npm or CDN:

```sh
npm install @butility/media
```

```html
<!-- To use all the functions and methods -->
<script src="unpkg.com/@butility/media@latest/media.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/media.js"></script>
<!-- To use Image utils -->
<script src="unpkg.com/@butility/media@latest/image.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/image.js"></script>
<!-- To use Camera utils -->
<script src="unpkg.com/@butility/media@latest/camera.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/camera.js"></script>
<!-- To use Audio and Video utils -->
<script src="unpkg.com/@butility/media@latest/audiovisual.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/audiovisual.js"></script>
<!-- To use File utils -->
<script src="unpkg.com/@butility/media@latest/file.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/file.js"></script>
<!-- To use Blob utils -->
<script src="unpkg.com/@butility/media@latest/blob.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/blob.js"></script>
<!-- To use Full screen utils -->
<script src="unpkg.com/@butility/media@latest/full-screen.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/full-screen.js"></script>
```
## Examples

### Working with the camera
```js
import { recordVideo } from "@butility/media/camera"
import { downloadBlob } from "@butility/media/blob"
// or import { recordVideo, downloadBlob } from "@butility/media";

try {
    // Record the video
    const videoBlob = await recordVideo({
        fileType: "mp4",
        duration: 5000,
        targetElementId: "video-id"
    });

    // Download the recorded video
    downloadBlob(videoBlob, 'my-recorded-video.mp4');
} catch (error) {
    console.error('Error recording or downloading video:', error);
}
```
### Working with images
```js
import { preloadImagesWithCallback, resizeImage } from "@butility/media/image";
import { downloadBlob } from "@butility/media/blob";
// or import { preloadImagesWithCallback, resizeImage, downloadBlob } from "@butility/media";

const imageUrls = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/300'
];

preloadImagesWithCallback(imageUrls, (images) => {
    // Resize the first image for example
    const imageToResize = images[0];
    resizeImage(imageToResize, 200, 200).then((resizedBlob) => {
        if (resizedBlob) {
            downloadBlob(resizedBlob, 'resized-image.png');
        } else {
            console.error('Failed to resize image');
        }
    }).catch(error => {
        console.error('Error resizing image:', error);
    });
});

```
## Contributing

Contributions are welcome! Please follow the guidelines below:

1. Fork the repository.
2. Create a new branch for each significant change.
3. Submit a pull request with a clear description of the changes.

## License

This project is licensed under the [MIT License](LICENSE).
