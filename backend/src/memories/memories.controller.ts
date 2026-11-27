import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MemoriesService } from './memories.service.js';
import { CreateMemoryDto } from './dto/create-memory.dto.js';
import { UpdateMemoryDto } from './dto/update-memory.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('memories')
@UseGuards(JwtAuthGuard)
export class MemoriesController {
  // Dependency Injection melalui constructor
  constructor(private readonly memoriesService: MemoriesService) { }

  @Post()
  create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoriesService.create(createMemoryDto);
  }

  @Get()
  findAll() {
    return this.memoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoryDto:
    UpdateMemoryDto) {
    return this.memoriesService.update(id, updateMemoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesService.remove(id);
  }
}