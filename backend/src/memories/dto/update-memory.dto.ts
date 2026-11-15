import { PartialType } from '@nestjs/mapped-types';
import { CreateMemoryDto } from './create-memory.dto.js';

export class UpdateMemoryDto extends PartialType(CreateMemoryDto) {}
