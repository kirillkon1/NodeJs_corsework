import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/jwt.auth.guard";
import {LandingService} from "../landing/landing.service";
import {SpaceshipService} from "./spaceship.service";
import {Spaceship} from "./spaceship.model";
import {Request} from "express";
import {SpaceshipDto} from "./dto/spaceship.dto";
import {UpdateSpaceshipDto} from "./dto/updateSpaceship.dto";
import {MoveToSystemDto} from "./dto/moveToSystem.dto";
import {LandingBaseDto, LandingPlanetDto} from "../landing/landing.dto";



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
    @Get("pilot/:id")
    findAllByPilotId(@Param('id') id: string) {
        return this.service.findAllByPilotId(id)
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



    //Взаимодействие с планетой или базой

    @ApiOperation({summary: 'Посадить корабль на планету (нужно LandingDTO!).'})
    @ApiResponse({status: 200})
    @Put('planet')
    launchOnPlanet(@Body() dto: LandingPlanetDto) {
        return this.landingService.launchOnPlanet(dto)
    }

    @ApiOperation({summary: 'Посадить корабль на космическую станцию (нужен LandingDTO!).'})
    @ApiResponse({status: 200})
    @Put('base')
    launchOnBase(@Body() dto: LandingBaseDto) {
       return this.landingService.launchOnBase(dto)
    }

    //Взлёт
    @ApiOperation({summary: 'Покинуть станцию или планету (id корабля)'})
    @ApiResponse({status: 200})
    @Delete('/leave/:id')
    leave(@Param("id") ship_id: number) {
        return this.landingService.remove(ship_id)
    }

    @ApiOperation({summary: 'Находится ли корабль на планете/базе. Возращает id планеты/базы или false в обратном случае'})
    @ApiResponse({status: 200})
    @Get('/landed/:id')
    whereAmI(@Param("id") ship_id: number){
        return this.landingService.findWhereIsSpaceshipById(ship_id)
    }

    //Перемещение в другую систему

    @ApiOperation({summary: 'Перелететь в другую систему. (см. MoveToSystemDTO!)'})
    @ApiResponse({status: 200})
    @Put('move')
    moveToSystem(@Body() dto: MoveToSystemDto, @Req() req: Request) {
        this.service.moveToAnotherSystem(req, dto)
    }



    //Получение кораблей по планете или базе

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
