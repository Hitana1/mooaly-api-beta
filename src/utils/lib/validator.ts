export class Validator {
    static isImageMimeType(mimeType: string) {
        const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];
        return imageMimeTypes.includes(mimeType);
    }
}
