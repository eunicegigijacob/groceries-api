import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddGroceryDto } from './dto/add-grocery.dto';
import { AuthJwtGuard } from '../auth/guards/auth.guard';
import { GroceryService } from './grocery.service';
import { UpdateGroceryDto } from './dto/update-grocery.dto';

@Controller('/grocery')
@UseGuards(AuthJwtGuard)
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post('/')
  async addGroceryToCart(
    @Req() req: any,
    @Body() createGroceryDto: AddGroceryDto,
  ) {
    return this.groceryService.addGroceryItem(req.user.id, createGroceryDto);
  }

  @Get('/')
  async getUserCart(@Req() req: any) {
    return this.groceryService.getUserGroceries(req.user.id);
  }

  @Get(':id')
  async getGroceryItem(@Req() req: any) {
    return this.groceryService.getGroceryById({
      userId: req.user.id,
      id: req.params.id,
    });
  }

  @Get('/filter')
  async getGroceryItemByFilter(@Req() req: any) {
    return this.groceryService.getGroceryItemsByFilter({
      userId: req.user.id,
      query: req.query,
    });
  }

  @Patch(':id')
  async updateGroceryItem(
    @Req() req: any,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ) {
    const updated = await this.groceryService.updateGrocery({
      userId: req.user.id,
      id: req.params.id,
      dto: updateGroceryDto,
    });
    if (!updated) {
      throw new NotFoundException('Grocery item not found');
    }
    return updated;
  }

  @Delete(':id')
  async deleteGroceryItem(@Req() req: any) {
    const deleted = await this.groceryService.deleteGrocery({
      userId: req.user.id,
      id: req.params.id,
    });
    if (!deleted) {
      throw new NotFoundException('Grocery item not found');
    }
    return { message: 'Item deleted successfully' };
  }
}
