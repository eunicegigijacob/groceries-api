import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GroceryRepository } from './grocery.repository';
import { UserRepository } from '../users/users.repository';
import { IAddGrocery } from './interface/add-grocery.interface';
import { IUpdateGroceryItem } from './interface/update-grocery.interface';

@Injectable()
export class GroceryService {
  constructor(
    private readonly groceryRepository: GroceryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async checkGroceryItemExists(userId: string, id: string) {
    const item = await this.groceryRepository.getById(id, userId);

    if (!item) {
      throw new NotFoundException(
        'Invalid Id, grocery item does not exist for this user.',
      );
    }

    return item;
  }

  async addGroceryItem(userId: string, dto: IAddGrocery) {
    const { name, quantity, price } = dto;

    // Check if the user already added this grocery item
    const existingItem = await this.groceryRepository.getItemByFilter({
      name: name.trim(),
      userId,
    });

    if (existingItem) {
      throw new BadRequestException(
        'You already have this item in your list, update the quantity instead.',
      );
    }

    const item = await this.groceryRepository.create({
      userId,
      name: name.trim(),
      quantity,
      price: +price,
    });

    return {
      status: true,
      message: 'Grocery item added successfully.',
      data: { item: this.groceryRepository.returnGroceryItem(item) },
    };
  }

  async getUserGroceries(userId: string) {
    const existingUser = await this.userRepository.getById(userId);

    if (!existingUser) {
      throw new BadRequestException('Invalid user id.');
    }
    const items = await this.groceryRepository.getItemsByUserId(userId);

    return {
      status: true,
      message: 'Grocery list retrieved successfully.',
      data: {
        items: this.groceryRepository.returnGroceryItems(items.items),
        page: items.page,
        totalPages: items.totalCount,
        totalAmount: items.totalAmount,
      },
    };
  }

  async getGroceryById({ userId, id }: { userId: string; id: string }) {
    const item = await this.checkGroceryItemExists(userId, id);

    return {
      status: true,
      message: 'Grocery item retrieved successfully.',
      data: {
        item: this.groceryRepository.returnGroceryItem(item),
      },
    };
  }

  async getGroceryItemsByFilter({ userId, query }) {
    const { name, quantity, price, id } = query;

    const filter: any = { userId };

    if (name) {
      filter.name = { $regex: new RegExp(name, 'i') };
    }

    if (quantity && !isNaN(+quantity)) {
      filter.quantity = { $gte: +quantity };
    }
    if (price && !isNaN(+price)) {
      filter.price = { $lte: +price };
    }
    if (id) {
      filter._id = id;
    }
    const items = await this.groceryRepository.getItemsByFilter(filter);

    if (!items || items.length === 0) {
      throw new NotFoundException('No grocery items found');
    }

    return {
      status: true,
      message: 'Grocery items retrieved successfully.',
      data: {
        items: this.groceryRepository.returnGroceryItems(items),
      },
    };
  }

  async updateGrocery({
    userId,
    id,
    dto,
  }: {
    userId: string;
    id: string;
    dto: IUpdateGroceryItem;
  }) {
    await this.checkGroceryItemExists(userId, id);

    const updatedItem = await this.groceryRepository.updateItemById(id, dto);

    return {
      status: true,
      message: 'Grocery item updated successfully.',
      data: {
        updatedItem: this.groceryRepository.returnGroceryItem(updatedItem),
      },
    };
  }

  async deleteGrocery({ userId, id }) {
    await this.checkGroceryItemExists(userId, id);

    const result = await this.groceryRepository.deleteItemById(id);

    if (!result) {
      throw new NotFoundException('Error deleting item.');
    }

    return {
      status: true,
      message: 'Grocery item deleted successfully.',
      data: {},
    };
  }
}
