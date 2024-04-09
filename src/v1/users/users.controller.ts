import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoginUserDto} from './dto/login-user.dto'
import { error } from 'console';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    try{
      return this.usersService.create(createUserDto);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post('/signin')
  login(@Body() loginUserDto: LoginUserDto) {
    try{
      return this.usersService.userLogin(loginUserDto)
    }catch(error){
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('/all')
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    console.log('page and limit', page, limit);
    return this.usersService.findAll(page, limit);

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
