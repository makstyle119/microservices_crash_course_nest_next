import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';

interface data {
  id: number;
  title: string;
  image: string;
  likes: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModule: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModule.find().exec();
  }

  async create(data: data): Promise<Product> {
    return new this.productModule(data).save();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModule.findOne({ id });
  }

  async update(id: number, data: data): Promise<Product> {
    return this.productModule.findOneAndUpdate({ id }, data);
  }

  async delete(id: number): Promise<void> {
    this.productModule.deleteOne({ id });
  }
}
