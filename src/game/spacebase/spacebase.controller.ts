import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SpacebaseService} from "./spacebase.service";
import {Base} from "./spacebase.model";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";



@Controller('spacebase')
@ApiTags('Космические станции')
@UseGuards(JwtAuthGuard)
export class SpacebaseController {

    constructor(private readonly service: SpacebaseService) {
    }

    @ApiOperation({summary: 'Получение всех Spacebase.'})
    @ApiResponse({status: 200, type: [Base]})
    @Get('all')
    findAll(){
        return this.service.getAll()
    }

    @ApiOperation({summary: 'Получение Spacebase по его id.'})
    @ApiResponse({status: 200, type: [Base]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }

    @ApiOperation({summary: 'Получение Spacebase по id системы, в которой он находится'})
    @ApiResponse({status: 200, type: [Base]})
    @Get('system/:id')
    findAllBySystemId(@Param('id') id: string){
        return this.service.findAllBySystemId(id)
    }

    // @ApiOperation({summary: 'Удаление Spacebase по его id.'})
    // @ApiResponse({status: 200})
    // @Delete(':id')
    // remove(@Param('id') id: string){
    //     return this.service.removeOne(id)
    // }



}
