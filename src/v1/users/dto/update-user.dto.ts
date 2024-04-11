import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsEmail, Length} from 'class-validator'

export class UpdateUserDto {
    
    @ApiProperty()
    @Length(3, 20, {message: 'username must be 3 to 20 character'})
    username: string;

    @ApiProperty()
    @IsEmail({}, {message: 'Please enter valid email address'})
    email: string;
}
