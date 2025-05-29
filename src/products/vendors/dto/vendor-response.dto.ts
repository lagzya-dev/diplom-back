import { ApiProperty } from '@nestjs/swagger';

export class VendorResponseDto {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор продавца' })
  id: number;

  @ApiProperty({ example: 'Фермер Иванов', description: 'Название продавца' })
  name: string;

  @ApiProperty({
    example: 'Свежие фермерские продукты',
    description: 'Описание продавца',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: 'Центральный рынок',
    description: 'Название рынка, где расположен продавец',
  })
  marketName: string;

  @ApiProperty({
    example: 'https://example.com/logo.jpg',
    description: 'Ссылка на логотип продавца',
    nullable: true,
  })
  logoUrl: string | null;

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
