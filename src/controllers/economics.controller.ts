import {Controller, Delete, Get, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EconomicsService} from "../services/economics.service";
import {Economics} from "../models/economics.model";

@Controller('eco')
@ApiTags('Экономика')
export class EconomicsController {

    constructor(private readonly service: EconomicsService) {
    }

    @ApiOperation({summary: 'Получение всех Economics.'})
    @ApiResponse({status: 200, type: [Economics]})
    @Get()
    findAll(){
        return this.service.getAll()
    }


    @ApiOperation({summary: 'Получение Economics по его id.'})
    @ApiResponse({status: 200, type: [Economics]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }


    @ApiOperation({summary: 'Удаление Economics по его id.'})
    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.service.removeOne(id)
    }

}
