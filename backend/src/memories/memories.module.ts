import { Module } from '@nestjs/common';
import { MemoriesService } from './memories.service.js';
import { MemoriesController } from './memories.controller.js';
import { MemoriesStatsController } from './memories-stats.controller.js';

@Module({
  controllers: [MemoriesStatsController, MemoriesController],
  providers: [MemoriesService],
})
export class MemoriesModule {}
