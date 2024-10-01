# Installation

To use the Media package in your project, follow these steps:

## Using npm

1. Open your terminal.
2. Navigate to your project directory.
3. Run the following command:

```bash
npm install @butility/media
# or
pnpm add @butility/media
# or
yarn add @butility/media
```

## Using CDN

You can also include the Media package via a CDN link in your HTML file:

```html
<!-- To use all the functions and methods -->
<script src="https://unpkg.com/@butility/media@latest/media.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/media.js" type="module"></script>
<!-- To use Image utils -->
<script src="https://unpkg.com/@butility/media@latest/image.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/image.js" type="module"></script>
<!-- To use Camera utils -->
<script src="https://unpkg.com/@butility/media@latest/camera.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/camera.js" type="module"></script>
<!-- To use Audio and Video utils -->
<script src="https://unpkg.com/@butility/media@latest/audiovisual.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/audiovisual.js" type="module"></script>
<!-- To use File utils -->
<script src="https://unpkg.com/@butility/media@latest/file.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/file.js" type="module"></script>
<!-- To use Blob utils -->
<script src="https://unpkg.com/@butility/media@latest/blob.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/blob.js" type="module"></script>
<!-- To use Full screen utils -->
<script src="https://unpkg.com/@butility/media@latest/full-screen.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/media@latest/full-screen.js" type="module"></script>
```

```js

import Media from "https://unpkg.com/@butility/media@latest/media.js";
import Media from "https://cdn.jsdelivr.net/npm/@butility/media@latest/media.js";

import Image from "https://unpkg.com/@butility/media@latest/image.js";
import Image from "https://cdn.jsdelivr.net/npm/@butility/media@latest/image.js";

import Camera from "https://unpkg.com/@butility/media@latest/camera.js";
import Camera from "https://cdn.jsdelivr.net/npm/@butility/media@latest/camera.js";
// ....
```

## Importing the Package

After installation, import the necessary modules in your JavaScript files:

```javascript
import { openCamera, capturePhoto } from '@butility/media/camera';
```