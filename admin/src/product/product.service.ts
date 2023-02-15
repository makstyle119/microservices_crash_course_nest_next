import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

interface data {
  title: string;
  image: string;
  likes?: number;
}

interface updateData {
  title?: string;
  image?: string;
  likes?: number;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }
  async create(data: data): Promise<Product> {
    return this.productRepository.save(data);
  }
  async get(id: any): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }
  async update(id: number, data: updateData): Promise<any> {
    return this.productRepository.update(id, data);
  }
  async delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
