import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from './firebase.module';

@Injectable()
export class FirebaseStorageService {
  private readonly bucket: ReturnType<admin.storage.Storage['bucket']>;

  constructor(@Inject(FIREBASE_ADMIN) private readonly firebaseApp: admin.app.App) {
    this.bucket = this.firebaseApp.storage().bucket();
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const fileName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const fileRef = this.bucket.file(fileName);

    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    return `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
  }
}
