import {Controller,Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Sector} from "./sector.model";
import {SectorService} from "./sector.service";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";

@Controller('sector')
@ApiTags('Сектор')
@UseGuards(JwtAuthGuard)
export class SectorController {

    constructor(private readonly service: SectorService) {
    }

    @ApiOperation({summary: 'Получение всех секторов.'})
    @ApiResponse({status: 200, type: [Sector]})
    @Get('all')
    findAll(){
        return this.service.getAll()
    }


    @ApiOperation({summary: 'Получение сектора по его id.'})
    @ApiResponse({status: 200, type: [Sector]})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.service.findOneById(id)
    }


    // @ApiOperation({summary: 'Удаление сектора по его id.'})
    // @ApiResponse({status: 200})
    // @Delete(':id')
    // remove(@Param('id') id: string){
    //     return this.service.removeOne(id)
    // }

}
