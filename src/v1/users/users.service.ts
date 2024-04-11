import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JsonObject } from '@prisma/client/runtime/library';
import { ActiveInactiveDto} from './dto/active-inactive-user.dto';




@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}



  async getProfile(userId: number) {

    if(!userId) return null;
    
    const user = await this.prisma.user.findUnique({ where:{id: userId},
      select: {id: true, username: true, email: true, mobile: true, status: true, recipes: true}})

    return user;
  }




  async profileUpdate(userId: number, updateUserDto: UpdateUserDto) {
    const {username, email} =  updateUserDto;
    if(!username && !email) return null;

    let data:JsonObject= {};
    if (username) data.username = username;
    if (email) data.email = email;

    const user = await this.prisma.user.update({
      where: {id: userId, status: true}, data });

    return user;
  }




  async markActiveInactive(userId: number, statusDto: ActiveInactiveDto) {
    // return `This action removes a #${id} user`;
    const { valuse } = statusDto
    const user = await this.prisma.user.update({where: {id: userId}, 
      data: {status: valuse ? true : false} })
      
    return user;
  }
}
