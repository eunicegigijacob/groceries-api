import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Grocery {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: Number,
    min: 1,
  })
  quantity: number;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  price: number;

  @Prop({
    required: true,
    type: String,
  })
  userId: string;
}

export type GroceryDocument = Grocery & Document;

export const GrocerySchema = SchemaFactory.createForClass(Grocery);
