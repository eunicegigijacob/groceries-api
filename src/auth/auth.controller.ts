import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  // Todo: Uncomment when forgot password and reset password functionality is implemented

  //   @Post('forgot-password')
  //   @HttpCode(HttpStatus.OK)
  //   async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //     return this.authService.forgotPassword(forgotPasswordDto);
  //   }

  //   @Post('reset-password')
  //   @HttpCode(HttpStatus.OK)
  //   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //     return this.authService.resetPassword(resetPasswordDto);
  //   }
}
