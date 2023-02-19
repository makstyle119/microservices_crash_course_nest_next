import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

interface data {
  id: number;
  title: string;
  image: string;
  likes: string;
}

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
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
