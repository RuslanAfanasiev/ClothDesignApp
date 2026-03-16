import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseStorageService {
  private readonly bucket = admin.storage().bucket();

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileName = `${folder}/${uuidv4()}-${file.originalname}`;
    const fileRef = this.bucket.file(fileName);

    await fileRef.save(file.buffer, {
      contentType: file.mimetype,
      public: true,
    });

    return fileRef.publicUrl();
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const fileName = fileUrl.split('/').slice(-2).join('/');
    await this.bucket.file(fileName).delete({ ignoreNotFound: true });
  }
}
