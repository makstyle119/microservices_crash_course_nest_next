import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.create({
      title,
      image,
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.productService.get(id);
  }
}
