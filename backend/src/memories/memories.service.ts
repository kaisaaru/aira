import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto.js';
import { UpdateMemoryDto } from './dto/update-memory.dto.js';
import { Memory } from './entities/memory.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MemoriesService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateNextId(): Promise<string> {
    const existing = await this.prisma.memory.findMany({
      select: { id: true },
    });

    const maxNum = existing.reduce((max, item) => {
      const match = /^MEM-(\d+)$/.exec(item.id);
      if (!match) return max;
      const num = Number.parseInt(match[1], 10);
      return num > max ? num : max;
    }, 0);

    return `MEM-${String(maxNum + 1).padStart(2, '0')}`;
  }

  async create(createMemoryDto: CreateMemoryDto): Promise<Memory> {
    const existing = await this.prisma.memory.findFirst({
      where: {
        factText: {
          equals: createMemoryDto.factText,
          mode: 'insensitive',
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        'Fakta memori ini sudah pernah dicatat sebelumnya.',
      );
    }

    const id = await this.generateNextId();

    return this.prisma.memory.create({
      data: {
        id,
        category: createMemoryDto.category,
        factText: createMemoryDto.factText,
        importance: createMemoryDto.importance,
        isActive: createMemoryDto.isActive ?? true,
      },
    });
  }

  async findAll(): Promise<Memory[]> {
    return this.prisma.memory.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string): Promise<Memory> {
    const memory = await this.prisma.memory.findUnique({
      where: { id },
    });

    if (!memory) {
      throw new NotFoundException(`Memori dengan ID '${id}' tidak ditemukan.`);
    }

    return memory;
  }

  async update(id: string, updateMemoryDto: UpdateMemoryDto): Promise<Memory> {
    await this.findOne(id);

    if (updateMemoryDto.factText) {
      const duplicate = await this.prisma.memory.findFirst({
        where: {
          id: { not: id },
          factText: {
            equals: updateMemoryDto.factText,
            mode: 'insensitive',
          },
        },
      });

      if (duplicate) {
        throw new ConflictException(
          'Fakta memori ini sudah pernah dicatat sebelumnya.',
        );
      }
    }

    return this.prisma.memory.update({
      where: { id },
      data: updateMemoryDto,
    });
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    await this.findOne(id);

    await this.prisma.memory.delete({
      where: { id },
    });

    return {
      message: `Memori '${id}' berhasil dihapus.`,
      deletedId: id,
    };
  }

  // Endpoint query lanjutan (Poin 6): statistik count & filter where
  async getStats(category?: string, minImportance?: number) {
    const where: {
      category?: string;
      importance?: { gte: number };
    } = {};

    if (category) {
      where.category = category;
    }
    if (minImportance !== undefined && !Number.isNaN(minImportance)) {
      where.importance = { gte: minImportance };
    }

    const [total, activeCount, groupedByCategory, filteredItems] =
      await Promise.all([
        this.prisma.memory.count({ where }),
        this.prisma.memory.count({ where: { ...where, isActive: true } }),
        this.prisma.memory.groupBy({
          by: ['category'],
          where,
          _count: { id: true },
        }),
        this.prisma.memory.findMany({
          where,
          orderBy: [{ importance: 'desc' }, { createdAt: 'asc' }],
        }),
      ]);

    const byCategory = groupedByCategory.reduce<Record<string, number>>(
      (acc, row) => {
        acc[row.category] = row._count.id;
        return acc;
      },
      {},
    );

    return {
      filter: {
        category: category ?? 'all',
        minImportance:
          minImportance !== undefined && !Number.isNaN(minImportance)
            ? minImportance
            : null,
      },
      summary: {
        total,
        active: activeCount,
        inactive: total - activeCount,
        byCategory,
      },
      data: filteredItems,
    };
  }
}
