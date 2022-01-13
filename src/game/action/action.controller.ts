import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";
import {ActionService} from "./action.service";
import {Action} from "./action.model";
import {ActionDto} from "./action.dto";
import {Request} from "express";
import {Pilot} from "../pilot/pilot.model";
import {ActionType} from "./action-type/action-type.model";



@Controller('action')
@ApiTags('Действия')
@UseGuards(JwtAuthGuard)
export class ActionController {

    constructor(private readonly service: ActionService) {
    }
    

    @ApiOperation({summary: 'Получение всех Action по id пилота. (ограничение в 30 ответов)'})
    @ApiResponse({status: 200, type: [Action]})
    @Get('pilot/:id')
    findActionsByPilotId(@Param('id') id: number){
        return this.service.findRatingListByPilotId(id)
    }

    @ApiOperation({summary: 'Получить типы действий'})
    @ApiResponse({status: 200, type: [ActionType]})
    @Get('typeList')
    getActionList(){
        return this.service.findAllActionTypes()
    }

    @ApiOperation({summary: 'Записать действие пилота и обновить его рейтинг. (см. ActionDto)'})
    @ApiResponse({status: 200, type: Pilot})
    @Put('pilot')
    updatePilotsRating(@Req() req: Request, @Body() dto: ActionDto){
        this.service.updateRating(req, dto)
    }




}
