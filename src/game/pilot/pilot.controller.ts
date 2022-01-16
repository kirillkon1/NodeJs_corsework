import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";
import {PilotService} from "./pilot.service";
import {Pilot} from "./pilot.model";
import {Request} from "express";
import {PilotDto} from "./pilot.dto";

@Controller('pilot')
@ApiTags('Пилоты')
@UseGuards(JwtAuthGuard)
export class PilotController {

    constructor(private readonly service: PilotService) {
    }

    @ApiOperation({summary: 'Создание пилота (по JWT).'})
    @ApiResponse({status: 200, type: Pilot})
    @Post()
    create(@Body() dto: PilotDto, @Req() req: Request){
        return this.service.create(dto, req)
    }

    @ApiOperation({summary: 'Получение всех Pilot.'})
    @ApiResponse({status: 200, type: [Pilot]})
    @Get('all')
    findAll(){
        return this.service.getAll()
    }

    @Get('user/:id')
    findAllByUserId(@Param('id') id: string)
    {
        return this.service.findAllByUserId(id);
    }


    @ApiOperation({summary: 'Получение Pilot по его id.'})
    @ApiResponse({status: 200, type: [Pilot]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }

    @ApiOperation({summary: 'Получение Pilot его владельцу (по JWT).'})
    @ApiResponse({status: 200, type: Pilot})
    @Get('owned')
    findOwned(@Req() req: Request){
        return this.service.findOwned(req)
    }



    @ApiOperation({summary: 'Удаление Pilot по его id (по JWT).'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: Request){
        return this.service.removeOne(id, req)
    }

}
