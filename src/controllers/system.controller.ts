import {Controller, Delete, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Sector} from "../models/sector.model";
import {SystemService} from "../services/system.service";
import {System} from "../models/system.model";

@Controller('system')
@ApiTags('Системы')
export class SystemController {

    constructor(private readonly service: SystemService) {
    }

    @ApiOperation({summary: 'Получение всех Систем.'})
    @ApiResponse({status: 200, type: [System]})
    @Get()
    findAll(){
        return this.service.getAll()
    }


    @ApiOperation({summary: 'Получение системы по его id.'})
    @ApiResponse({status: 200, type: [System]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }

    @ApiOperation({summary: 'Получение систем по id сектора.'})
    @ApiResponse({status: 200, type: [System]})
    @Get('sector/:id')
    findAllBySector(@Param('id') id: string){
        return this.service.findAllBySectorId(id)
    }


    @ApiOperation({summary: 'Удаление системы по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }


}
