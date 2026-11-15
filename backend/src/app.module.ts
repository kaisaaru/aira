import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MemoriesModule } from './memories/memories.module.js';

@Module({
  imports: [MemoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
