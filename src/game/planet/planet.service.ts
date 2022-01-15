import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Planet} from "./planet.model";
import {Race} from "../race/race.model";
import {Politics} from "./politics/politics.model";
import {Economics} from "./economics/economics.model";


@Injectable()
export class PlanetService {

    constructor(@InjectModel(Planet) private planetRepository: typeof Planet, @InjectModel(Race) private raceRepository: typeof Race) {}

    async getAll(){
        return await this.planetRepository.findAll({include: [{model: Politics}, {model: Economics}]})
    }

    findOneById(id: string): Promise<Planet>{
        return this.planetRepository.findOne({

            where:{
                id,
            },
            include:[{model: Politics}, {model: Economics}, {model: Race}]
        })
    }

    async getAllBySystemId(systemId: string){
        return await this.planetRepository.findAll({where: {system_id: systemId, }, include: [{model: Politics}, {model: Economics}, {model: Race}]})
    }

    async removeOne(id: string): Promise<void>{
        const entity = await this.findOneById(id)
        await entity.destroy()
    }
}
