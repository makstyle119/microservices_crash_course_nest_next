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
  async product_created(product: data) {
    this.productService.create(product);
  }
}
