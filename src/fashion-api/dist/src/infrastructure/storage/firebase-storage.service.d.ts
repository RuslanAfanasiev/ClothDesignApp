export declare class FirebaseStorageService {
    private readonly bucket;
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
