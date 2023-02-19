import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

interface data {
  id: number;
  title: string;
  image: string;
  likes: number;
}

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product: data = await this.productService.findOne(id);
    this.httpService
      .post(`http://localhost:8000/api/product/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });
    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @EventPattern('product_created')
  async productCreated(product: data) {
    await this.productService.create(product);
  }

  @EventPattern('product_updated')
  async productUpdated(product: data) {
    await this.productService.update(product.id, product);
  }

  @EventPattern('product_deleted')
  async productDeleted(id: number) {
    await this.productService.delete(id);
  }
}
