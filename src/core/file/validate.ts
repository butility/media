export function validateFileType(
    file: File,
    allowedTypes: string[],
    allowedExtensions: string[],
): boolean {
    const fileType = file.type;
    const fileName = file.name;
    const fileExtension = fileName
        .substring(fileName.lastIndexOf('.') + 1)
        .toLowerCase(); // Extract extension

    const mimeTypeValid = allowedTypes.some((typePattern) => {
        const regex = new RegExp(`^${typePattern.replace('*', '.*')}$`); // Convert wildcard to regex
        return regex.test(fileType);
    });

    const extensionValid = allowedExtensions.includes(fileExtension);

    if (!mimeTypeValid || !extensionValid) {
        console.error(
            `File type or extension not allowed. Got type: ${fileType}, extension: ${fileExtension}`,
        );
        return false;
    }

    return true;
}

export function validateFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
}
