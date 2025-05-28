import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, FilterQuery, Model, ProjectionType } from 'mongoose';
import { Grocery, GroceryDocument } from './schemas/grocery-item.schema';
import { PAGINATION_LIMIT } from '../constants';

@Injectable()
export class GroceryRepository {
  constructor(
    @InjectModel(Grocery.name) private GroceryModel: Model<GroceryDocument>,
  ) {}

  returnGroceryItem(item: any): any {
    return {
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      dateAdded: item.createdAt,
    };
  }

  returnGroceryItems(items: GroceryDocument[]): any[] {
    return items.map((item) => this.returnGroceryItem(item));
  }

  public async create(item: any): Promise<GroceryDocument> {
    const newItem = await this.GroceryModel.create({
      ...item,
    });

    return newItem;
  }

  public async getItemByFilter(filter: any): Promise<GroceryDocument> {
    const item = await this.GroceryModel.findOne({ ...filter }).exec();
    return item ?? null;
  }

  public async getItemsByFilter(filter: any): Promise<GroceryDocument[]> {
    const items = await this.GroceryModel.find({ ...filter }).exec();
    return items;
  }

  public async getById(
    id: string,
    userId: string,
    project?: ProjectionType<GroceryDocument>,
  ): Promise<GroceryDocument | null> {
    const item = await this.GroceryModel.findOne(
      { _id: id, userId },
      project,
    ).exec();

    return item ?? null;
  }

  async getItemsByUserId(
    userId: string,
    page = 1,
  ): Promise<{
    items: GroceryDocument[];
    page: number;
    totalCount: number;
    totalAmount: number;
  }> {
    const query = { userId };

    const totalCount = await this.GroceryModel.countDocuments(query).exec();

    const groceries = await this.GroceryModel.find(query)
      .limit(PAGINATION_LIMIT)
      .skip(PAGINATION_LIMIT * (page - 1))
      .exec();

    const totalAmount = await this.GroceryModel.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    return {
      items: groceries,
      page: page ?? 1,
      totalCount,
      totalAmount: totalAmount[0]?.total || 0,
    };
  }

  public async updateItemById(
    id: string,
    data: FilterQuery<Grocery>,
    session?: ClientSession,
  ): Promise<GroceryDocument> {
    const updatedItem = (await this.GroceryModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, session },
    )) as GroceryDocument;

    return updatedItem;
  }

  public async deleteItemById(id: string): Promise<GroceryDocument> {
    const result = await this.GroceryModel.findByIdAndDelete(id);
    return result;
  }
}
