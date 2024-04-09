import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { username, email, mobile, password, status } = createUserDto;

    return this.prisma.user.create({
      data: {username, email, mobile, password, status}
    }).catch((error) => {
      console.error(error.meta);
      if(error?.message.includes('Unique constraint failed')){
        throw new ConflictException(`${error?.meta?.target[0]} already exists`);
      }
    })
  }

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
