export class Memory {
    id: string;              // string (UUID/ID unik)
    category: string;        // string ('identity' | 'hobby' | 'study' | 'preference')
    factText: string;        // string (isi fakta memori)
    importance: number;      // number (skala prioritas 1 - 5)
    isActive: boolean;       // boolean (status aktif/nonaktif)
    createdAt: Date;         // Date
}