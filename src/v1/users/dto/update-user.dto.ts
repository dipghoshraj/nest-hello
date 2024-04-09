import { PartialType } from '@nestjs/mapped-types';

import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
    
    @ApiProperty()
    mobile: string;

    @ApiProperty()
    email: string;
}
