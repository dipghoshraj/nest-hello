import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';



export class LoginUserDto{

    @ApiProperty({required: true})
    @IsEmail({}, {message: 'Please enter valid email address'})
    email:string;

    @ApiProperty({required: true})
    password:string;
}