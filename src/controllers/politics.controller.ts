import {Controller, Delete, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PoliticsService} from "../services/politics.service";
import {Politics} from "../models/politics.model";

@Controller('pol')
@ApiTags('Политика')
export class PoliticsController {

    constructor(private readonly service: PoliticsService) {
    }

    @ApiOperation({summary: 'Получение всех Politics.'})
    @ApiResponse({status: 200, type: [Politics]})
    @Get()
    findAll(){
        return this.service.getAll()
    }


    @ApiOperation({summary: 'Получение Politics по его id.'})
    @ApiResponse({status: 200, type: [Politics]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }


    @ApiOperation({summary: 'Удаление Politics по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }

}
