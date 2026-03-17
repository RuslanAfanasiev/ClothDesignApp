import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Global()
@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): admin.app.App => {
        if (admin.apps.length > 0) {
          return admin.apps[0]!;
        }
        return admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          storageBucket: configService.getOrThrow<string>('FIREBASE_STORAGE_BUCKET'),
        });
      },
    },
  ],
  exports: [FIREBASE_ADMIN],
})
export class FirebaseModule {}
