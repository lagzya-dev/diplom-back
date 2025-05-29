import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор категории',
  })
  id: number;

  @ApiProperty({ example: 'Овощи', description: 'Название категории' })
  name: string;

  @ApiProperty({
    example: 'https://example.com/vegetables.jpg',
    description: 'Ссылка на изображение категории',
    nullable: true,
  })
  imageUrl: string | null;

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
