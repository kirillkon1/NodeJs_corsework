import {Controller, Delete, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Users} from "./model/users.model";


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
    @Get()
    findAll() {
        return this.userService.getAllUsers()
    }


    @ApiOperation({summary: 'Получение пользователя по его id.'})
    @ApiResponse({status: 200, type: [Users]})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }


    @ApiOperation({summary: 'Удаление пользователя по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.removeOne(id)
    }

}
