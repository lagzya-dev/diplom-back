import { ApiProperty } from '@nestjs/swagger';
export class AddToCartDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;
}

export class UpdateCartDto {
  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 5 })
  quantity: number;
}
