import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Sector} from "../models/sector.model";
import {SectorService} from "../services/sector.service";

@Controller('sector')
@ApiTags('Сектор')
export class SectorController {

    constructor(private readonly service: SectorService) {
    }

    @ApiOperation({summary: 'Получение всех секторов.'})
    @ApiResponse({status: 200, type: [Sector]})
    @Get()
    findAll(){
        return this.service.getAll()
    }


    @ApiOperation({summary: 'Получение сектора по его id.'})
    @ApiResponse({status: 200, type: [Sector]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }


    @ApiOperation({summary: 'Удаление сектора по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }

}
