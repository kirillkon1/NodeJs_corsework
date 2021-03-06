import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Landing} from "./landing.model";
import {LandingBaseDto, LandingPlanetDto} from "./landing.dto";
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



    async launchOnPlanet(dto: LandingPlanetDto){
        const planet:Planet = await this.planetService.findOneById(String(dto.planet_id))

        const entity = await this.landingRepository.findOne({where: {
                spaceship_id:dto.spaceship_id
            }})

        if(entity){
            throw new HttpException("Ошибка! Уже существует факт приземления на планету/базу!", HttpStatus.FORBIDDEN)
        }

        //Рассматриваем сценарий приземления на планету.
        if(planet){
            await this.createLanding(dto.spaceship_id, null, dto.planet_id)
            return
        }
        throw new HttpException("Не получилось приземлиться на планету!", HttpStatus.CONFLICT)

    }



    async launchOnBase(dto: LandingBaseDto){
        const ship:Spaceship = await this.spaceshipService.findOneById(String(dto.spaceship_id))
        const base:Base = await this.spacebaseService.findOneById(String(dto.spacebase_id))

        const entity = await this.landingRepository.findOne({where: {
                spaceship_id:dto.spaceship_id
            }})

        if(entity){
            throw new HttpException("Ошибка! Уже существует факт приземления на планету/базу!", HttpStatus.FORBIDDEN)
        }

        //Сценарий приземления на Станцию.
        const pilot:Pilot = ship.pilot

        if(base.spacebase_type.rating_up >= pilot.rating && base.spacebase_type.rating_down <= pilot.rating ){
            await this.createLanding(dto.spaceship_id, dto.spacebase_id, null)
            return
        }

        throw new HttpException("Тебе тут не рады, пошёл отсюда к черту!", HttpStatus.FORBIDDEN)
    }



    async remove(spaceship_id: number): Promise<void>{
        const entity = await this.findOneByShipId(spaceship_id)

        if(!entity) throw new HttpException("Вы не можете взлететь, никуда не приземлившись!!", HttpStatus.FORBIDDEN)

        await entity.destroy()
    }



    async findAllShipsByPlanetId(id: string){
        return await this.landingRepository.findAll({attributes: [], where:{planet_id: id}, include: {model: Spaceship}})
    }



    async findAllShipsBySpacebaseId(id: string){
        return await this.landingRepository.findAll({attributes: [], where:{spacebase_id: id}, include: {model: Spaceship}})
    }



    async findWhereIsSpaceshipById(id: number){

        const landing = await this.landingRepository.findOne({where:{spaceship_id: id}})

        if(!landing) return {
            isLanded: false
        }

        if(landing.planet_id && landing.spacebase_id) throw new HttpException("Меня подставили! Тут какая-то ошибка!!", HttpStatus.CONFLICT)

        if(landing.planet_id){
            return {
                isLanded: true,
                planetID: this.landingRepository.findOne({attributes: ["planet_id"], where: {spaceship_id: id}/*, include: {model: Planet}*/}),
            }
        }

        if(landing.spacebase_id) {
            return {
                isLanded: true,
                baseID: this.landingRepository.findOne({attributes: ["spacebase_id"], where: {spaceship_id: id}/*, include: {model: Base}*/})
            }
        }


    }



    private createLanding(spaceship_id: number, spacebase_id: number, planet_id: number){
        spacebase_id = !!spacebase_id ? spacebase_id : null
        planet_id = !!planet_id ? planet_id : null

        this.landingRepository.create({spaceship_id, planet_id, spacebase_id})
    }



    findOneById(id: number): Promise<Landing>{
        return this.landingRepository.findOne({
            where:{
                id,
            },
        })
    }



    findOneByShipId(id: number): Promise<Landing>{
        return this.landingRepository.findOne({
            where:{
                spaceship_id: id,
            },
        })
    }
}
