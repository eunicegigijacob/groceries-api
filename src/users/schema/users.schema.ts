import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  first_name = '';

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  last_name = '';

  @Prop({
    type: String,
    required: false,
    unique: true,
    trim: true,
  })
  phone_number = '';

  @Prop({
    type: String,
    required: false,
    default: '+234',
  })
  dial_code = '';

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email = '';

  @Prop({
    required: true,
    type: String,
  })
  password = '';

  @Prop({
    required: false,
    type: String,
  })
  otp_token = '';

  @Prop({
    required: false,
    type: Date,
  })
  otp_expires_at = '';

  @Prop({
    required: true,
    type: Boolean,
  })
  verified = false;
}

export type UserDocument = User &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
