import { FirebaseStorageService } from '../../infrastructure/firebase/firebase-storage.service';
export declare class UploadController {
    private readonly storageService;
    constructor(storageService: FirebaseStorageService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
