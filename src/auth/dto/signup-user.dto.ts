
import { ApiProperty } from "@nestjs/swagger";


export class SignupUserDto{
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    mobile: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ required: false, default: false })
    status?: boolean = false;
}