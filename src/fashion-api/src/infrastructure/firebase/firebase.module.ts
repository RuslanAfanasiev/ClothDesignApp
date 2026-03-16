import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './design-app-242fe-firebase-adminsdk-fbsvc-7c949ba179.json';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Global()
@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN,
      useFactory: (): admin.app.App => {
        if (admin.apps.length > 0) {
          return admin.apps[0]!;
        }
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
          storageBucket: 'design-app-242fe.firebasestorage.app',
        });
      },
    },
  ],
  exports: [FIREBASE_ADMIN],
})
export class FirebaseModule {}
