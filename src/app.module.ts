import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersController} from './v1/users/users.controller'
import {UsersService} from './v1/users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth.guard';



@Module({
  imports: [PrismaModule, 
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService, AuthGuard],
})
export class AppModule {}
