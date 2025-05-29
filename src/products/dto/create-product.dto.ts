import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Свежие помидоры', description: 'Название продукта' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Спелые органические помидоры с местной фермы',
    description: 'Описание продукта',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 150, description: 'Цена продукта в рублях' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'https://example.com/tomatoes.jpg',
    description: 'Ссылка на изображение',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 1, description: 'ID продавца' })
  @IsInt()
  @Min(1)
  vendorId: number;

  @ApiProperty({
    example: 3,
    description: 'ID категории (опционально)',
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  categoryId?: number;
}
