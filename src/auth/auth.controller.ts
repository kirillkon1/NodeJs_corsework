import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UserDto} from "../users/dto/userDto";
import {AuthService} from "./auth.service";
import {NoAuthGuard} from "./no-auth/no-auth.guard";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('/login')
    @UseGuards(NoAuthGuard)
    login(@Body() userDto: UserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @UseGuards(NoAuthGuard)
    registration(@Body() userDto: UserDto){
        return this.authService.registration(userDto)
    }


}
