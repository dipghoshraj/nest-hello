import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {SignupUserDto} from './dto/signup-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtservice: JwtService
    ){}

    async signupUser(signupdto: SignupUserDto){
        const { username, email, mobile, password } = signupdto;
        const hashedPassword = await bcrypt.hash(password, 10);

        let user =await this.prisma.user.create({
            data: {username, email, mobile, password: hashedPassword},
            select: { id: true, username: true, email: true, mobile: true, status: true}
          }).catch((error) => {
            console.error(error.meta);
            if(error?.message.includes('Unique constraint failed')){
              throw new ConflictException(`${error?.meta?.target[0]} already exists`);
            }
        })
        let access_token = await this.jwtservice.signAsync({uername: username})
        return {...user, access_token: access_token}
    }


    async signin(logindto: LoginUserDto){

        const {email, password} = logindto
        let user = await this.prisma.user.findUnique({ where: { email } });
        console.log(user);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { userId: user.id, userName: user.username };
            return { id: user.id, email: user.email, access_token: await this.jwtservice.signAsync(payload)};
        }
        throw new UnauthorizedException('User or password wrong')
    }


    async validateToken(token: string): Promise<boolean> {

        return false;
    }
}
