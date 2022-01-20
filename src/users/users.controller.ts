 import { Controller, Delete, Get, Param, Req, UseGuards } from "@nestjs/common";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Users} from "./users.model";
 import { JwtAuthGuard } from "../auth/jwt.auth.guard";
 import { Request } from "express";

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('Пользователи ')
export class UsersController {

    constructor(private readonly userService: UsersService) {
    }


    // @ApiOperation({summary: 'Создание и получение нового пользователя.'})
    // @ApiResponse({status: 200, type: Users})
    // @Post()
    // create(@Body() userDto: UserDto){
    //     return this.userService.createUser(userDto)
    // }


    @ApiOperation({summary: 'Получение всех пользователей.'})
    @ApiResponse({status: 200, type: [Users]})
    @Get('all')
    findAll() {
        return this.userService.getAllUsers()
    }


    @ApiOperation({summary: 'Получение пользователя по его id.'})
    @ApiResponse({status: 200, type: [Users]})
    @Get('id/:id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id)
    }

    @Get('/me')
    getMe(@Req() req: Request)
    {
        return this.userService.findMe(req);
    }


    @ApiOperation({summary: 'Удаление пользователя по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.removeOne(id)
    }

}
