import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FirebaseStorageService } from '../../infrastructure/firebase/firebase-storage.service';
import { FirebaseAuthGuard } from '../../shared/guards/firebase-auth.guard';

@Controller('upload')
@UseGuards(FirebaseAuthGuard)
export class UploadController {
  constructor(private readonly storageService: FirebaseStorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    const url = await this.storageService.upload(file);
    return { url };
  }
}
