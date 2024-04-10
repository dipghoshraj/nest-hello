import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';




@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get('profile')
  @ApiBearerAuth('access-token') 
  @UseGuards(AuthGuard)
  findOne(@Req() req: any) {
    const userId = req.userId
    try{
      console.log(`page and limit ${userId}`);
      return this.usersService.findOne(userId);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Patch('update')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(2, updateUserDto);
  }

  @Delete()
  remove(@Req() req: any) {
    return this.usersService.remove(2);
  }
}
