### Image Module

This module provides a collection of functions for manipulating images, including resizing, cropping, compressing, rotating, flipping, and converting images to different formats. It can handle image processing directly within web applications and ensures image transformations are easy to implement and maintain. Below is a detailed description of the components and functions included in this module:

#### Types
- **Axis** (`"horizontal"` | `"vertical"`): Defines the direction for flipping images. The image can be flipped along either the horizontal or vertical axis.
  
- **Coordinates**: An interface used for specifying crop boundaries on an image.
  - **width**: Width of the cropped area.
  - **height**: Height of the cropped area.
  - **x**: X-coordinate (horizontal position) of the starting point for cropping.
  - **y**: Y-coordinate (vertical position) of the starting point for cropping.

#### Namespace: `Image`

This namespace includes the following exported functions for various image manipulations:

##### Functions:

1. **calculateAspectRatio(width: number, height: number): number**
   - Calculates and returns the aspect ratio of an image based on its width and height.

2. **compressImage(file: File, quality: any): Promise<Blob | null>**
   - Compresses an image file to reduce its size while maintaining quality. The `quality` parameter controls the level of compression. Returns a `Blob` object or `null` if compression fails.

3. **convertImageToBase64(file: File): Promise<string>**
   - Converts an image file into a Base64-encoded string. This is useful for embedding images in web pages or sending them via APIs.

4. **cropImage(file: File, coordinates: Coordinates): Promise<Blob | null>**
   - Crops an image based on the specified `Coordinates` (width, height, x, y). Returns a `Blob` containing the cropped image or `null` if cropping fails.

5. **flipImage(file: File, axis: Axis): Promise<Blob | null>**
   - Flips the image horizontally or vertically, as determined by the `axis` parameter. Returns a `Blob` or `null` upon failure.

6. **preloadImagesWithCallback(imageUrls: string[], callback: Function): void**
   - Preloads multiple images given an array of URLs. Once the images are loaded, a callback function is invoked.

7. **resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob | null>**
   - Resizes an image while maintaining the aspect ratio, ensuring the image fits within the given maximum width and height. Returns a `Blob` object of the resized image or `null` upon failure.

8. **rotateImage(file: File, degrees: number): Promise<Blob | null>**
   - Rotates an image by the specified number of degrees. Returns a `Blob` of the rotated image or `null` if the operation fails.

#### Default Export:
- The module is exported as the `Image` namespace by default, allowing access to all its functions for efficient image manipulation.
