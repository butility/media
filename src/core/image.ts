import type { Coordinates, Axis } from '@/types/media';

export function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            if (ctx) ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => resolve(blob), file.type);
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = URL.createObjectURL(file);
    });
}

export function rotateImage(file: File, degrees: number): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.height;
            canvas.height = img.width;

            if (ctx) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(degrees * (Math.PI / 180));
                ctx.drawImage(
                    img,
                    -img.width / 2,
                    -img.height / 2,
                    img.width,
                    img.height,
                );
            }
            canvas.toBlob((blob) => resolve(blob), file.type);
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = URL.createObjectURL(file);
    });
}

export function compressImage(file: File, quality: any): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) ctx.drawImage(img, 0, 0, img.width, img.height);

            canvas.toBlob((blob) => resolve(blob), file.type, quality);
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = URL.createObjectURL(file);
    });
}

export function cropImage(file: File, coordinates: Coordinates): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = coordinates.width;
            canvas.height = coordinates.height;

            if (ctx)
                ctx.drawImage(
                    img,
                    -coordinates.x,
                    -coordinates.y,
                    img.width,
                    img.height,
                );

            canvas.toBlob((blob) => resolve(blob), file.type);
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = URL.createObjectURL(file);
    });
}

export function flipImage(file: File, axis: Axis): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            if (axis === 'horizontal' && ctx) {
                ctx.scale(-1, 1);
                ctx.drawImage(img, -img.width, 0, img.width, img.height);
            } else if (axis === 'vertical' && ctx) {
                ctx.scale(1, -1);
                ctx.drawImage(img, 0, -img.height, img.width, img.height);
            } else {
                reject(
                    new Error('Invalid axis. Use "horizontal" or "vertical".'),
                );
                return;
            }

            canvas.toBlob((blob) => resolve(blob), file.type);
        };

        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = URL.createObjectURL(file);
    });
}

export function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve((reader.result as string).split(',')[1]);
        };

        reader.onerror = () => {
            reject(new Error('Failed to read image as base64.'));
        };

        reader.readAsDataURL(file);
    });
}

export function preloadImagesWithCallback(
    imageUrls: string[],
    callback: Function,
): void {
    const images: HTMLImageElement[] = [];

    let loadedImages = 0;

    function imageLoaded() {
        loadedImages++;

        if (loadedImages === imageUrls.length) {
            callback(images);
        }
    }

    imageUrls.forEach((url, index) => {
        const img = new Image();

        img.onload = () => {
            images[index] = img;
            imageLoaded();
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${url}`);
            imageLoaded();
        };

        img.src = url;
    });
}

export function calculateAspectRatio(width: number, height: number): number {
    return width / height;
}
