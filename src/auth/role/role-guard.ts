import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../../users/users.service";
import {UserRoleService} from "../../users/userRole.service";
import {Users} from "../../users/model/users.model";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.decorator";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private jwtService: JwtService, private userService: UsersService, private userRoleService: UserRoleService,
                private reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return false
            }

            const AuthHeader = req.headers.authorization
            const bearer = AuthHeader.split(' ')[0]
            const token = AuthHeader.split(' ')[1]

            if (bearer != 'Bearer' || !token) {
                throw new UnauthorizedException({message: "Неавторизованный пользователь!"})
            }

            const user: Users = this.jwtService.verify(token)
            const role = await this.userRoleService.findOne(String(user.role_id))

            req.user = user
            return requiredRoles.includes(role.role_name)
        } catch (e) {
            throw new UnauthorizedException({message: "Неавторизованный пользователь!"})
        }


    }


}