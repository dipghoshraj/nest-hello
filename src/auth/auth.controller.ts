import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignupUserDto} from './dto/signup-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signup(@Body() signupUserdto: SignupUserDto){
        try{
            return this.authService.signupUser(signupUserdto);
          }
          catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
          }
    }


    @Post('/signin')
    signin(@Body() logindto: LoginUserDto){
        try{
            return this.authService.signin(logindto);
        }catch(error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }
}
