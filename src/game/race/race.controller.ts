import {Controller, Delete, Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Race} from "./race.model";
import {RaceService} from "./race.service";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";

@Controller('race')
@ApiTags('Расы')
@UseGuards(JwtAuthGuard)
export class RaceController {

    constructor(private readonly service: RaceService) {
    }

    @ApiOperation({summary: 'Получение всех Race.'})
    @ApiResponse({status: 200, type: [Race]})
    @Get()
    findAll(){
        return this.service.getAll()
    }

    @ApiOperation({summary: 'Получение Race по его id.'})
    @ApiResponse({status: 200, type: [Race]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }

    @ApiOperation({summary: 'Удаление Race по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }

}
