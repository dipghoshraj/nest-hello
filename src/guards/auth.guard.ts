import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService){}

    async canActivate(context: ExecutionContext) {
        
        
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'].split(' ')[1];

        console.log(token);
        if(!token) {
            throw new UnauthorizedException();

        }

        const user = await this.authService.validateToken(token);

        if(!user) {
            throw new UnauthorizedException();
        }
        return true;

    }
}