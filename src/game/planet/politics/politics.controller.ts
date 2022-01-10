import {Controller, Delete, Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PoliticsService} from "./politics.service";
import {Politics} from "./politics.model";
import {JwtAuthGuard} from "../../../auth/jwt.auth.guard";

@Controller('pol')
@ApiTags('Политика')
@UseGuards(JwtAuthGuard)
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
