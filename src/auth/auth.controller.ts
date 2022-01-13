import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDto} from "../users/userDto";
import {AuthService} from "./auth.service";
import {Request} from "express";



@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('/login')
    login(@Body() userDto: UserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: UserDto){
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Проверка валидности JWT'})
    @ApiResponse({status: 200, type: Boolean})
    @Get('/checkToken')
    checkToken(@Req() req: Request){
        return this.authService.validateToken(req)
    }

}
