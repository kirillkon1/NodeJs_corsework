import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PlanetService} from "./planet.service";
import {Planet} from "./planet.model";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";
import {LandingService} from "../landing/landing.service";


@Controller('planet')
@ApiTags('Планеты')
@UseGuards(JwtAuthGuard)
export class PlanetController {

    constructor(private readonly service: PlanetService) {
    }

    @ApiOperation({summary: 'Получение всех Planet.'})
    @ApiResponse({status: 200, type: [Planet]})
    @Get('all')
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

    @ApiOperation({summary: 'Получение рас по id планеты.'})
    @ApiResponse({status: 200, type: [Planet]})
    @Get('system/:id/races')
    findAllRacesByPlanetId(@Param('id') id: string){
        return this.service.getAllBySystemId(id)
    }

    // @ApiOperation({summary: 'Удаление Planet по его id.'})
    // @ApiResponse({status: 200})
    // @Delete(':id')
    // remove(@Param('id') id: string){
    //     return this.service.removeOne(id)
    // }




}
