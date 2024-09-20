### Blob Utility Module

The **Blob Utility Module** provides a set of tools for managing, processing, and verifying `Blob` objects, enabling operations such as encryption, decryption, conversion, chunking, and downloading. It also includes utilities for handling `Blob` validation, making it a comprehensive toolkit for working with binary large objects (blobs) in web applications.

#### Interfaces

- **VerifyBlobOptions**
  - **maxSize** (number, optional): The maximum allowable size of the blob (in bytes).
  - **allowedTypes** (string[], optional): An array of allowed MIME types for the blob.

---

#### Namespace: `Blob`

The `Blob` namespace contains the following exported functions to handle various blob operations:

---

### **Functions:**

#### **1. blobToHex(blob: Blob): Promise<string>**
- **Description**: Converts a `Blob` into its hexadecimal string representation.
- **Parameters**:
  - `blob` (Blob, required): The blob to convert.
- **Returns**: A `Promise` that resolves to a hex string representation of the blob.

#### **2. chunkBlob(blob: Blob, chunkSize: number): Blob[]**
- **Description**: Splits a `Blob` into multiple smaller chunks of the specified size.
- **Parameters**:
  - `blob` (Blob, required): The blob to chunk.
  - `chunkSize` (number, required): The size of each chunk (in bytes).
- **Returns**: An array of `Blob` chunks.

#### **3. convertBase64ToBlob(base64: string, contentType: string, onProgress?: Function | null): Blob**
- **Description**: Converts a Base64-encoded string into a `Blob` object.
- **Parameters**:
  - `base64` (string, required): The Base64 string to convert.
  - `contentType` (string, required): The MIME type of the resulting blob.
  - `onProgress` (Function, optional): An optional progress callback function.
- **Returns**: The converted `Blob`.

#### **4. convertBlobToBase64(blob: Blob, onProgress?: (progress: number) => void | null): Promise<string>**
- **Description**: Converts a `Blob` into a Base64-encoded string.
- **Parameters**:
  - `blob` (Blob, required): The blob to convert.
  - `onProgress` (Function, optional): An optional progress callback function.
- **Returns**: A `Promise` that resolves to a Base64 string.

#### **5. decryptBlob(encryptedBlob: Blob, key: CryptoKey): Promise<Blob>**
- **Description**: Decrypts an encrypted `Blob` using the provided cryptographic key.
- **Parameters**:
  - `encryptedBlob` (Blob, required): The encrypted blob to decrypt.
  - `key` (CryptoKey, required): The key used to decrypt the blob.
- **Returns**: A `Promise` that resolves to the decrypted `Blob`.

#### **6. downloadBlob(blob: Blob, filename: string, fallbackContentType?: string): void**
- **Description**: Triggers a download of the specified `Blob`, saving it with the given filename.
- **Parameters**:
  - `blob` (Blob, required): The blob to download.
  - `filename` (string, required): The name to give the downloaded file.
  - `fallbackContentType` (string, optional): A fallback MIME type if the blob’s type is undefined.

#### **7. encryptBlob(blob: Blob, key: CryptoKey): Promise<Blob>**
- **Description**: Encrypts a `Blob` using the provided cryptographic key.
- **Parameters**:
  - `blob` (Blob, required): The blob to encrypt.
  - `key` (CryptoKey, required): The key used to encrypt the blob.
- **Returns**: A `Promise` that resolves to the encrypted `Blob`.

#### **8. mergeBlobs(blobs: Blob[], contentType: string, bufferSize: number): Blob**
- **Description**: Merges multiple `Blob` objects into a single `Blob` with the specified content type.
- **Parameters**:
  - `blobs` (Blob[], required): An array of blobs to merge.
  - `contentType` (string, required): The MIME type of the resulting merged blob.
  - `bufferSize` (number, required): The buffer size to use during merging.
- **Returns**: The merged `Blob`.

#### **9. readBlobAsText(blob: Blob, encoding: string): Promise<string | ArrayBuffer | null>**
- **Description**: Reads a `Blob` as a text string or `ArrayBuffer` using the specified encoding.
- **Parameters**:
  - `blob` (Blob, required): The blob to read.
  - `encoding` (string, required): The character encoding to use.
- **Returns**: A `Promise` that resolves to the text or `ArrayBuffer` representation of the blob.

#### **10. textToBlob(text: any, encoding: string): Blob**
- **Description**: Converts a text string into a `Blob` object using the specified encoding.
- **Parameters**:
  - `text` (any, required): The text to convert.
  - `encoding` (string, required): The character encoding to use for the conversion.
- **Returns**: The resulting `Blob`.

#### **11. verifyBlob(blob: Blob, options: VerifyBlobOptions): boolean**
- **Description**: Validates a `Blob` against specified size and type criteria.
- **Parameters**:
  - `blob` (Blob, required): The blob to validate.
  - `options` (VerifyBlobOptions, optional): Options to specify max size and allowed MIME types.
- **Returns**: `true` if the blob meets the criteria, otherwise `false`.

---

#### Default Export:
- The `Blob` namespace is exported by default, providing convenient access to all blob-related functions.
