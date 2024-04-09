import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';





@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}




  async create(createUserDto: CreateUserDto) {
    const { username, email, mobile, password, status } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {username, email, mobile, status, password: hashedPassword},
      select: { id: true, username: true, email: true, mobile: true, status: true}
    },).catch((error) => {
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



  async userLogin(loginUserDto: LoginUserDto){

    const {email, password} = loginUserDto
    let user = await this.prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { sub: user.id, username: user.username };
      return { id: user.id, email: user.email, access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('User or password wrong')
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
