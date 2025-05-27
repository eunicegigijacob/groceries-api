import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UserModule } from '../users/users.module';
import { configs } from '../configs';

@Module({
  imports: [
    JwtModule.register({
      secret: configs.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptUtil],
  exports: [AuthService],
})
export class AuthModule {}
