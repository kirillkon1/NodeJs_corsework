import {Controller, Delete, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PlanetService} from "../services/planet.service";
import {Planet} from "../models/planet.model";

@Controller('planet')
@ApiTags('Планеты')
export class PlanetController {

    constructor(private readonly service: PlanetService) {
    }

    @ApiOperation({summary: 'Получение всех Planet.'})
    @ApiResponse({status: 200, type: [Planet]})
    @Get()
    findAll(){
        return this.service.getAll()
    }


    @ApiOperation({summary: 'Получение Planet по его id.'})
    @ApiResponse({status: 200, type: [Planet]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }


    @ApiOperation({summary: 'Получение Planet по id системы.'})
    @ApiResponse({status: 200, type: [Planet]})
    @Get('system/:id')
    findAllBySystemId(@Param('id') id: string){
        return this.service.getAllBySystemId(id)
    }

    @ApiOperation({summary: 'Получение Planet по id системы.'})
    @ApiResponse({status: 200, type: [Planet]})
    @Get('system/:id')
    findAllRacesByPlanetId(@Param('id') id: string){
        return this.service.getAllBySystemId(id)
    }

    @ApiOperation({summary: 'Удаление Planet по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }



}
