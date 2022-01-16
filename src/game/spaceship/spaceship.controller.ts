import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";
import {LandingService} from "../landing/landing.service";
import {SpaceshipService} from "./spaceship.service";
import {Spaceship} from "./spaceship.model";
import {LandingDto} from "../landing/landing.dto";
import {SpaceshipDto} from "./dto/spaceship.dto";
import {MoveToSystemDto} from "./dto/moveToSystemDto";
import {Request} from "express";
import {UpdateSpaceshipDto} from "./dto/updateSpaceship.dto";
import { Pilot } from "../pilot/pilot.model";


@Controller('spaceship')
@ApiTags('Космические корабли')
@UseGuards(JwtAuthGuard)
export class SpaceshipController {

    constructor(private readonly service: SpaceshipService, private readonly landingService: LandingService) {
    }

    @ApiOperation({summary: 'Создать новый корабль (см. SpaceshipDTO).'})
    @ApiResponse({status: 200, type: Spaceship})
    @Post()
    create(@Body() dto: SpaceshipDto) {
        return this.service.createShip(dto);
    }

    @ApiOperation({summary: 'Обновить существующий корабль (нужен id => см. UpdateSpaceshipDto).'})
    @ApiResponse({status: 200, type: Spaceship})
    @Post('update')
    update(@Body() dto: UpdateSpaceshipDto, @Req() req: Request) {
        return this.service.updateSpaceship(req, dto)
    }


    @ApiOperation({summary: 'Получение корабля по id пилота.'})
    @ApiResponse({status: 200, type: Spaceship})
    @Get("pilot/:id") // есть ситем id внтури
    findAllByPilotId(@Param('id') id: string, @Req() req: Request) {
        return this.service.findAllByPilotId(id, req)
    }

    @ApiOperation({summary: 'Получение всех Spaceship.'})
    @ApiResponse({status: 200, type: [Spaceship]})
    @Get('all')
    findAll() {
        return this.service.findAll()
    }

    @ApiOperation({summary: 'Получение всех Spaceship со связью Pilot.'})
    @ApiResponse({status: 200, type: [Spaceship]})
    @Get('all/pilot')
    findAllIncludePilot() {
        return this.service.findAllIncludePilot()
    }



    @ApiOperation({summary: 'Получение одного Spaceship по его id.'})
    @ApiResponse({status: 200, type: Spaceship})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOneById(id)
    }

    @ApiOperation({summary: 'Получение всех Spaceship по id системы.'})
    @ApiResponse({status: 200, type: [Spaceship]})
    @Get('system/:id')
    findAllBySystemId(@Param('id') id: string) {
        return this.service.findAllBySystemId(id)
    }

    @ApiOperation({summary: 'Посадить корабль на планету (нужно LandingDTO!).'})
    @ApiResponse({status: 200})
    @Put('planet')
    launchOnPlanet(@Body() dto: LandingDto) {
        return this.landingService.launchOn(dto)
    }

    @ApiOperation({summary: 'Посадить корабль на космическую станцию (нужен LandingDTO!).'})
    @ApiResponse({status: 200})
    @Put('base')
    launchOnBase(@Body() dto: LandingDto) {
        this.landingService.launchOn(dto)
    }

    @ApiOperation({summary: 'Перелететь в другую систему. (см. MoveToSystemDTO!)'})
    @ApiResponse({status: 200})
    @Put('move')
    moveToSystem(@Body() dto: MoveToSystemDto, @Req() req: Request) {
        this.service.moveToAnotherSystem(req, dto)
    }

    @ApiOperation({summary: 'Покинуть станцию или планету (см. LandingDTO!).'})
    @ApiResponse({status: 200})
    @Delete('/leave')
    leave(@Body() dto: LandingDto) {
        this.landingService.remove(dto)
    }

    @ApiOperation({summary: 'Получить все корабли (Spaceship), которые есть на планете. (id планеты)'})
    @Get('planet/:id')
    findShipsByPlanetId(@Param('id') id: string) {
        return this.landingService.findAllShipsByPlanetId(id)
    }

    @ApiOperation({summary: 'Получить все корабли (Spaceship), которые есть на станции. (id станции)'})
    @ApiResponse({status: 200, type: [Spaceship]})
    @Get('base/:id')
    findShipsByBaseId(@Param('id') id: string) {
        return this.landingService.findAllShipsBySpacebaseId(id)
    }


}
