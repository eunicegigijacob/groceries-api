import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string = '';

  @IsNotEmpty()
  @IsString()
  readonly email: string = '';

  @IsNotEmpty()
  @IsString()
  readonly token: string = '';
}
