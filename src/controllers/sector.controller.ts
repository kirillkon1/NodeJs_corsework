import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UserDto} from "../models/dto/userDto";
import {UsersService} from "../users/users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Users} from "../users/users.model";
import {Sector} from "../models/sector.model";
import {SectorService} from "../services/sector.service";

@Controller('sector')
@ApiTags('Сектор')
export class SectorController {

    constructor(private readonly service: SectorService) {
    }

    // @ApiOperation({summary: 'Создание нового пользователя.'})
    // @ApiResponse({status: 200, type: Users})
    // @Post()
    // create(@Body() userDto: UserDto){
    //     return this.userService.createUser(userDto)
    // }


    @ApiOperation({summary: 'Получение всех секторов.'})
    @ApiResponse({status: 200, type: [Sector]})
    @Get()
    findAll(){
        return this.service.getAllUsers()
    }


    @ApiOperation({summary: 'Получение сектора по его id.'})
    @ApiResponse({status: 200, type: [Sector]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOne(id)
    }


    @ApiOperation({summary: 'Удаление сектора по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }

}
