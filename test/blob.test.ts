import {
    convertBase64ToBlob,
    convertBlobToBase64,
    textToBlob,
    mergeBlobs,
    chunkBlob,
    readBlobAsText,
    verifyBlob,
} from '../src/core/blob'; 
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Blob Utility Functions', () => {
    const sampleBase64 = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
    const sampleBlob = new Blob(['Hello, World!'], { type: 'text/plain' });
    const sampleText = 'Hello, World!';
    let sampleKey: CryptoKey;

    beforeAll(() => {
        // Mock the crypto.subtle API
        window.crypto = {
            subtle: {
                async generateKey() {
                    return {}; // Mock CryptoKey
                },
                async encrypt() {
                    return new ArrayBuffer(10); // Mock encrypted data
                },
                async decrypt() {
                    return new ArrayBuffer(13); // Mock decrypted data size
                },
            },
        } as unknown as Crypto;

        // Mock TextEncoder
        global.TextEncoder = class {
            encode(text: string) {
                return new Uint8Array(Buffer.from(text));
            }
        } as unknown as typeof TextEncoder;
    });

    it('should convert base64 to Blob', () => {
        const blob = convertBase64ToBlob(sampleBase64.split(',')[1], 'text/plain');
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/plain');
        expect(blob.size).toBe(13); // "Hello, World!" length
    });

    it('should convert Blob to base64', async () => {
        const base64 = await convertBlobToBase64(sampleBlob);
        expect(base64).toBe(sampleBase64.split(',')[1]);
    });

    it('should convert text to Blob', () => {
        const blob = textToBlob(sampleText);
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/plain;charset=utf-8');
        expect(blob.size).toBe(sampleText.length);
    });

    it('should merge multiple Blobs', async () => {
        const blob1 = new Blob(['Hello, '], { type: 'text/plain' });
        const blob2 = new Blob(['World!'], { type: 'text/plain' });
        const mergedBlob = mergeBlobs([blob1, blob2]);

        expect(mergedBlob).toBeInstanceOf(Blob);
        expect(await readBlobAsText(mergedBlob)).toBe('Hello, World!');
    });
    
    it('should chunk a Blob', () => {
        const chunks = chunkBlob(sampleBlob, 5);
        expect(chunks.length).toBe(3); // "Hello", ", Wo", "rld!"
    });

    it('should read Blob as text', async () => {
        const text = await readBlobAsText(sampleBlob);
        expect(text).toBe('Hello, World!');
    });

    it('should verify Blob size and type', () => {
        const options = { maxSize: 20, allowedTypes: ['text/plain'] };
        expect(verifyBlob(sampleBlob, options)).toBe(true);

        options.maxSize = 5;
        expect(verifyBlob(sampleBlob, options)).toBe(false);

        options.allowedTypes = ['application/json'];
        expect(verifyBlob(sampleBlob, options)).toBe(false);
    });
});
