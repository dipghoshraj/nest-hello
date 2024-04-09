import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';




@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  @ApiBearerAuth('access-token') 
  @UseGuards(AuthGuard)
  findAll(@Query('next') next: number, @Query('limit') limit: number) {
    try{
      console.log('page and limit', next, limit);
      return this.usersService.findAll(+next, limit);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {

    try{
      console.log('page and limit');
      return this.usersService.findOne(+id);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
