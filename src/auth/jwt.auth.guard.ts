import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Users} from "../users/model/users.model";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        try {
            const AuthHeader = req.headers.authorization

            const bearer = AuthHeader.split(' ')[0]
            const token = AuthHeader.split(' ')[1]
            if (bearer != 'Bearer' || !token) {
                throw new UnauthorizedException({message: "Не авторизованный пользователь!"})
            }

            const user: Users = this.jwtService.verify(token)

            req.user = user
            return true

        } catch (e) {
            throw new UnauthorizedException({message: "Не авторизованный пользователь!"})
        }

    }

}