import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // Проверка существования продавца
    const vendorExists = await this.prisma.vendor.findUnique({
      where: { id: dto.vendorId },
    });
    if (!vendorExists) {
      throw new NotFoundException('Vendor not found');
    }

    // Проверка категории (если указана)
    if (dto.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!categoryExists) {
        throw new NotFoundException('Category not found');
      }
    }

    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        imageUrl: dto.imageUrl,
        vendor: { connect: { id: dto.vendorId } },
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
      },
      include: { vendor: true, category: true },
    });
  }

  async findAll(filters?: {
    categoryId?: number;
    vendorId?: number;
    minPrice?: number;
    maxPrice?: number;
  }) {
    return this.prisma.product.findMany({
      where: {
        ...(filters?.categoryId && { categoryId: filters.categoryId }),
        ...(filters?.vendorId && { vendorId: filters.vendorId }),
        ...((filters?.minPrice || filters?.maxPrice) && {
          price: {
            ...(filters.minPrice && { gte: filters.minPrice }),
            ...(filters.maxPrice && { lte: filters.maxPrice }),
          },
        }),
      },
      include: { vendor: true, category: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { vendor: true, category: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    // Проверка существования продукта
    await this.findOne(id);

    // Проверка продавца (если обновляется)
    if (dto.vendorId) {
      const vendorExists = await this.prisma.vendor.findUnique({
        where: { id: dto.vendorId },
      });
      if (!vendorExists) {
        throw new NotFoundException('Vendor not found');
      }
    }

    // Проверка категории (если обновляется)
    if (dto.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!categoryExists) {
        throw new NotFoundException('Category not found');
      }
    }
    const { vendorId, categoryId, ...data } = dto;
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        vendor: dto.vendorId ? { connect: { id: dto.vendorId } } : undefined,
        category:
          dto.categoryId !== undefined
            ? dto.categoryId
              ? { connect: { id: dto.categoryId } }
              : { disconnect: true }
            : undefined,
      },
      include: { vendor: true, category: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
