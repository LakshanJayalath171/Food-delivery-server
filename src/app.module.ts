import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { AdminModule } from './admin/admin.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    CloudinaryModule,

    AuthModule,

    UserModule,

    AdminModule,

    CategoriesModule,

    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
