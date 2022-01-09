import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Planet} from "../models/planet.model";
import {Race} from "../models/race.model";


@Injectable()
export class PlanetService {

    constructor(@InjectModel(Planet) private planetRepository: typeof Planet, @InjectModel(Race) private raceRepository: typeof Race) {}

    async getAll(){
        return await this.planetRepository.findAll({include: {all: true}})
    }

    findOneById(id: string): Promise<Planet>{
        return this.planetRepository.findOne({
            where:{
                id,
            },
            include:{all:true}
        })
    }

    async getAllBySystemId(systemId: string){
        return await this.planetRepository.findAll({where: {system_id: systemId, }, include: {all: true}})
    }

    async removeOne(id: string): Promise<void>{
        const entity = await this.findOneById(id)
        await entity.destroy()
    }
}
