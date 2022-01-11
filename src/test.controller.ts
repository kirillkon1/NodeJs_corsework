import {Body, Controller, Delete, Get, Param, Req, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt.auth.guard";
import {Request} from "express";
import {LandingService} from "./game/landing/landing.service";
import {SpaceshipService} from "./game/spaceship/spaceship.service";
import {SpaceshipDto} from "./game/spaceship/dto/spaceship.dto";
import {UpdateSpaceshipDto} from "./game/spaceship/dto/updateSpaceship.dto";


@Controller('test')
@ApiTags('TEST')
@UseGuards(JwtAuthGuard)
export class TestController {

    constructor(private landingService: LandingService, private spService: SpaceshipService) {
    }


    @ApiResponse({status: 200})
    @Get()
    findAll() {
        return "TEST"
    }


    @ApiResponse({status: 200})
    @Get('sector/:id')
    findAllBySector(@Param('id') id: string) {
        return `TEST + ${id}`
    }


    @ApiResponse({status: 200})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `REMOVE + ${id}`
    }


    @Get('test')
    test(@Req() req: Request, @Body() dto: UpdateSpaceshipDto) {
        return this.spService.updateSpaceship(req, dto)
    }


}
