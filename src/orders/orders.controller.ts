import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

class CreateOrderDto {
  address: string;
  phone: string;
}

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить все заказы' })
  async getOrders(@Req() req) {
    const userId = req.user.id;
    return this.ordersService.getOrders(userId);
  }
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 201, description: 'Заказ успешно создан' })
  @ApiResponse({ status: 400, description: 'Корзина пуста' })
  async createOrder(@Req() req, @Body() dto: CreateOrderDto) {
    const userId = req.user.id;
    const { address, phone } = dto;
    return this.ordersService.createOrder(userId, address, phone);
  }
}
