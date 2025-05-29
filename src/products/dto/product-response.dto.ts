import { ApiProperty } from '@nestjs/swagger';
import { VendorResponseDto } from '../vendors/dto/vendor-response.dto';
import { CategoryResponseDto } from '../categories/dto/category-response.dto';

export class ProductResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор продукта' })
  id: number;

  @ApiProperty({ example: 'Свежие помидоры', description: 'Название продукта' })
  name: string;

  @ApiProperty({
    example: 'Спелые органические помидоры',
    description: 'Описание продукта',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ example: 150.5, description: 'Цена продукта в рублях' })
  price: number;

  @ApiProperty({
    example: 'https://example.com/tomatoes.jpg',
    description: 'Ссылка на изображение продукта',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    type: VendorResponseDto,
    description: 'Информация о продавце',
  })
  vendor: VendorResponseDto;

  @ApiProperty({
    type: CategoryResponseDto,
    description: 'Категория продукта',
    nullable: true,
  })
  category: CategoryResponseDto | null;

  @ApiProperty({
    example: '2023-05-29T10:00:00.000Z',
    description: 'Дата и время создания записи',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-05-29T12:30:00.000Z',
    description: 'Дата и время последнего обновления',
  })
  updatedAt: Date;
}
