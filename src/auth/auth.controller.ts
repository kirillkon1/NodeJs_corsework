import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UserDto} from "../users/userDto";
import {AuthService} from "./auth.service";


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('/login')
    login(@Body() userDto: UserDto){
        console.log(userDto)
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: UserDto){
        return this.authService.registration(userDto)
    }


}
