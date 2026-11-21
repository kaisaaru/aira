import { Controller, Get, Query } from '@nestjs/common';
import { MemoriesService } from './memories.service.js';

@Controller('memories')
export class MemoriesStatsController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Get('stats')
  getStats(
    @Query('category') category?: string,
    @Query('minImportance') minImportance?: string,
  ) {
    const parsedMin =
      minImportance !== undefined ? Number.parseInt(minImportance, 10) : undefined;
    return this.memoriesService.getStats(category, parsedMin);
  }
}
