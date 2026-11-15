import { Module } from '@nestjs/common';
import { MemoriesService } from './memories.service.js';
import { MemoriesController } from './memories.controller.js';

@Module({
  controllers: [MemoriesController],
  providers: [MemoriesService],
})
export class MemoriesModule {}
