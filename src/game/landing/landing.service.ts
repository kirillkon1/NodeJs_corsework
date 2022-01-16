import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Landing} from "./landing.model";
import {LandingDto} from "./landing.dto";
import {Planet} from "../planet/planet.model";
import {Spaceship} from "../spaceship/spaceship.model";
import {Base} from "../spacebase/spacebase.model";
import {SpaceshipService} from "../spaceship/spaceship.service";
import {PlanetService} from "../planet/planet.service";
import {SpacebaseService} from "../spacebase/spacebase.service";
import {Pilot} from "../pilot/pilot.model";

@Injectable()
export class LandingService {

    constructor(@InjectModel(Landing) private landingRepository: typeof Landing,
                private spaceshipService: SpaceshipService, private planetService: PlanetService, private spacebaseService: SpacebaseService) {}

    async launchOn(dto: LandingDto){

        const ship:Spaceship = await this.spaceshipService.findOneById(String(dto.spaceship_id))
        const base:Base = await this.spacebaseService.findOneById(String(dto.spacebase_id))
        const planet:Planet = await this.planetService.findOneById(String(dto.planet_id))

        const entity = await this.landingRepository.findOne({where: {
            spaceship_id:dto.spaceship_id
            }})

        if(entity){
            throw new HttpException("Хватит ломать программу! Нельзя находится сразу в двух местах одновременно!", HttpStatus.FORBIDDEN)
        }

        if(planet && base){
            throw new HttpException("Нельзя приземлиться сразу и на планету, и на космическую станцию", HttpStatus.FORBIDDEN)
        }

        //Рассматриваем сценарий приземления на планету.
        if(planet){
            return await this.landingRepository.create(dto)
        }

        //Сценарий приземления на Станцию.
        const pilot:Pilot = ship.pilot

        if(base.spacebase_type.rating_up >= pilot.rating && base.spacebase_type.rating_down <= pilot.rating ){
            return await this.landingRepository.create(dto)
        }

        throw new HttpException("Тебе тут не рады, пошёл отсюда к черту!", HttpStatus.FORBIDDEN)
    }

    async remove(dto: LandingDto): Promise<void>{
        const entity = await this.findOneByShipId(String(dto.spaceship_id))

        if(!entity) throw new HttpException("Вы не можете взлететь, никуда не приземлившись!!", HttpStatus.FORBIDDEN)

        await entity.destroy()
    }

    async findAllShipsByPlanetId(id: string){
        return await this.landingRepository.findAll({attributes: [], where:{planet_id: id}, include: {model: Spaceship}})
    }

    async findAllShipsBySpacebaseId(id: string){
        return await this.landingRepository.findAll({attributes: [], where:{spacebase_id: id}, include: {model: Spaceship}})
    }


    async findWhereIsSpaceshipById(id: string){

        const landing = await this.landingRepository.findOne({where:{spaceship_id: id}})

        if(landing.planet_id && landing.spacebase_id) throw new HttpException("Меня подставили! Тут какая-то ошибка!!", HttpStatus.CONFLICT)

        if(landing.planet_id){
            return this.landingRepository.findOne({attributes: [], where: {spaceship_id: id}, include: {model: Planet}})
        }

        if(landing.spacebase_id){
            return this.landingRepository.findOne({attributes: [], where: {spaceship_id: id}, include: {model: Base}})
        }
    }

    findOneById(id: string): Promise<Landing>{
        return this.landingRepository.findOne({
            where:{
                id,
            },
        })
    }

    findOneByShipId(id: string): Promise<Landing>{
        return this.landingRepository.findOne({
            where:{
                spaceship_id: id,
            },
        })
    }
}
