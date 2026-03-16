import * as admin from 'firebase-admin';
export declare class FirebaseStorageService {
    private readonly firebaseApp;
    private readonly bucket;
    constructor(firebaseApp: admin.app.App);
    upload(file: Express.Multer.File): Promise<string>;
}
