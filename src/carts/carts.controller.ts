import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartsService } from './carts.service';
import { AddToCartDto, UpdateCartDto } from './dto/cart.dto';
import { Request } from 'express';
import { User } from '../../generated/prisma';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  getCart(@Req() req: Request) {
    return this.cartService.getOrCreateCart((req['user'] as User).id);
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({ status: 200, description: 'Item added to cart' })
  addToCart(@Req() req: Request, @Body() dto: AddToCartDto) {
    console.log(dto);
    return this.cartService.addToCart(
      (req['user'] as User).id,
      dto.productId,
      dto.quantity,
    );
  }

  @Post('update')
  @ApiOperation({ summary: 'Update item quantity in cart' })
  @ApiBody({ type: UpdateCartDto })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Item quantity updated' })
  updateCart(@Req() req: Request, @Body() dto: UpdateCartDto) {
    return this.cartService.updateCart(
      (req['user'] as User).id,
      dto.productId,
      dto.quantity,
    );
  }

  @Delete('remove/:productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'productId', type: Number })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Item removed from cart' })
  removeFromCart(@Req() req: Request, @Param('productId') productId: string) {
    console.log(productId);
    return this.cartService.removeFromCart(
      (req['user'] as User).id,
      +productId,
    );
  }

  @Post('clear')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Clear all items in cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  clearCart(@Req() req: Request) {
    return this.cartService.clearCart((req['user'] as User).id);
  }
}
