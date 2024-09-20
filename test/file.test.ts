import { 
    validateFileType, 
    validateFileSize,
} from '../src/core/file';
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
describe('File Utility Functions', () => {
    let consoleErrorSpy: any;

    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should validate file type and extension', () => {
        const file = new File([''], 'test.png', { type: 'image/png' });
        const allowedTypes = ['image/*'];
        const allowedExtensions = ['png', 'jpg'];

        expect(validateFileType(file, allowedTypes, allowedExtensions)).toBe(true);
    });

    it('should invalidate file type', () => {
        const file = new File([''], 'test.txt', { type: 'text/plain' });
        const allowedTypes = ['image/*'];
        const allowedExtensions = ['png', 'jpg'];

        expect(validateFileType(file, allowedTypes, allowedExtensions)).toBe(false);
    });


    it('should validate file size', () => {
        const file = new File([''], 'test.png', { type: 'image/png' });
        Object.defineProperty(file, 'size', { value: 500 }); // Mocking size property
        const maxSize = 1000;

        expect(validateFileSize(file, maxSize)).toBe(true);
    });

    it('should invalidate file size', () => {
        const file = new File([''], 'test.png', { type: 'image/png' });
        Object.defineProperty(file, 'size', { value: 1500 }); // Mocking size property
        const maxSize = 1000;

        expect(validateFileSize(file, maxSize)).toBe(false);
    });
});
