import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Экологически чистые помидоры',
    description: 'Название продукта',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Без пестицидов, выращены на открытом грунте',
    description: 'Описание продукта',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 170,
    description: 'Цена продукта в рублях',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'https://example.com/organic-tomatoes.jpg',
    description: 'Ссылка на изображение',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: 2,
    description: 'ID продавца',
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  vendorId?: number;

  @ApiProperty({
    example: 5,
    description: 'ID категории',
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  categoryId?: number;
}
