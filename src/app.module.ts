import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersController} from './v1/users/users.controller'
import {UsersService} from './v1/users/users.service';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
