import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';





@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService
  ) {}



  async findAll(page:number, limit: number) {
    let dbUsers = await this.prisma.user.findMany({where: { status: false } })
    return {
      users: dbUsers,
      next: dbUsers.length > 0 ? dbUsers.pop().id : null
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
