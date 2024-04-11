
import { ApiProperty } from "@nestjs/swagger";
import { Length, IsBoolean } from "class-validator";


export class ActiveInactiveDto{

    @IsBoolean({message: "Active Inactive must be boolean value"})
    @ApiProperty()
    valuse: Boolean;
}