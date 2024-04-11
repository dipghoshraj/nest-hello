import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ActiveInactiveDto} from './dto/active-inactive-user.dto'



@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get('profile') @ApiBearerAuth('access-token') @UseGuards(AuthGuard)
  findOne(@Req() req: any) {
    const userId = req.userId
    try{
      console.log(`page and limit ${userId}`);
      return this.usersService.getProfile(userId);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Patch('update')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.profileUpdate(2, updateUserDto);
  }

  @Delete('delete')
  remove(@Req() req: any, @Body() activedto: ActiveInactiveDto) {
    return this.usersService.markActiveInactive(2, activedto);
  }


}
