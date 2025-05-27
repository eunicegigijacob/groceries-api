import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string = '';

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  readonly first_name: string = '';

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  readonly last_name: string = '';

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly password: string = '';

  @IsString()
  @MaxLength(15)
  readonly phone_number: string = '';
}
