import { Injectable, NotFoundException, ConflictException } from
  '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto.js';
import { UpdateMemoryDto } from './dto/update-memory.dto.js';
import { Memory } from './entities/memory.entity.js';

@Injectable()
export class MemoriesService {
  // Penyimpanan sementara di memori sesuai instruksi tugas
  private memories: Memory[] = [
    {
      id: 'MEM-01',
      category: 'identity',
      factText: 'Nama panggilan pengguna adalah Kaisar.',
      importance: 5,
      isActive: true,
      createdAt: new Date('2026-09-20'),
    },
    {
      id: 'MEM-02',
      category: 'hobby',
      factText: 'Pengguna menyukai anime Detective Conan.',
      importance: 3,
      isActive: true,
      createdAt: new Date('2026-09-21'),
    },
  ];

  create(createMemoryDto: CreateMemoryDto): Memory {
    // Error Scenario 1: ConflictException jika fakta yang sama persis sudah ada
    const existing = this.memories.find(
      (m) => m.factText.toLowerCase() ===
        createMemoryDto.factText.toLowerCase(),
    );
    if (existing) {
      throw new ConflictException('Fakta memori ini sudah pernah dicatat sebelumnya.');
    }

    const newMemory: Memory = {
      id: `MEM-${String(this.memories.length + 1).padStart(2, '0')}`,
      ...createMemoryDto,
      isActive: createMemoryDto.isActive ?? true,
      createdAt: new Date(),
    };

    this.memories.push(newMemory);
    return newMemory;
  }

  findAll(): Memory[] {
    return this.memories;
  }

  findOne(id: string): Memory {
    // Error Scenario 2: NotFoundException jika ID tidak ditemukan
    const memory = this.memories.find((m) => m.id === id);
    if (!memory) {
      throw new NotFoundException(`Memori dengan ID '${id}' tidak ditemukan.`);
    }
    return memory;
  }

  update(id: string, updateMemoryDto: UpdateMemoryDto): Memory {
    const memory = this.findOne(id); // Otomatis trigger NotFoundException jika tidak ada
    const index = this.memories.findIndex((m) => m.id === id);

    const updatedMemory: Memory = {
      ...memory,
      ...updateMemoryDto,
    };

    this.memories[index] = updatedMemory;
    return updatedMemory;
  }

  remove(id: string): { message: string; deletedId: string } {
    this.findOne(id); // Otomatis trigger NotFoundException jika tidak ada
    this.memories = this.memories.filter((m) => m.id !== id);
    return {
      message: `Memori '${id}' berhasil dihapus.`,
      deletedId: id,
    };
  }
}