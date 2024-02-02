import { Module } from '@nestjs/common';
import { MediaUploadController } from './media-upload.controller';

@Module({
  controllers: [MediaUploadController]
})
export class MediaUploadModule {}
