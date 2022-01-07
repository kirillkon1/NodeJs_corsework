import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Race} from "../models/race.model";

@Injectable()
export class RaceService {

    constructor(@InjectModel(Race) private raceRepository: typeof Race) {}

    async getAll(){
        return await this.raceRepository.findAll()
    }

    findOneById(id: string): Promise<Race>{
        return this.raceRepository.findOne({
            where:{
                id,
            },
        })
    }

    async removeOne(id: string): Promise<void>{
        const entity = await this.findOneById(id)
        await entity.destroy()
    }
}
