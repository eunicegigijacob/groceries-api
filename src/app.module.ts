import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configs } from './configs';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GroceryModule } from './grocery/grocery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(configs.MONGODB_URL),
    UserModule,
    AuthModule,
    GroceryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
