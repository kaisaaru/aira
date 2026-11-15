import {
    IsString, IsNotEmpty, MinLength, IsIn, IsInt, Min, Max,
    IsBoolean, IsOptional
} from 'class-validator';

export class CreateMemoryDto {
    @IsString()
    @IsIn(['identity', 'hobby', 'study', 'preference'], {
        message: 'category harus salah satu dari: identity, hobby, study, preference',
    })
    category: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5, { message: 'factText minimal harus 5 karakter' })
    factText: string;

    @IsInt({ message: 'importance harus berupa angka bulat' })
    @Min(1, { message: 'importance minimal 1' })
    @Max(5, { message: 'importance maksimal 5' })
    importance: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}