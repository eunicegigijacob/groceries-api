import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateGroceryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsOptional()
  price: number;
}
