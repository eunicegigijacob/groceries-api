import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddGroceryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
