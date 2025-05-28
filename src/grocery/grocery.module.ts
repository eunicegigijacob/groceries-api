import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { GroceryRepository } from './grocery.repository';
import { Grocery, GrocerySchema } from './schemas/grocery-item.schema';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grocery.name, schema: GrocerySchema }]),
    JwtModule,
    UserModule,
  ],
  controllers: [GroceryController],
  providers: [GroceryService, GroceryRepository],
  exports: [GroceryService, GroceryRepository],
})
export class GroceryModule {}
