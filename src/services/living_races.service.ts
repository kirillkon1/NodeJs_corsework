import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {LivingRaces} from "../models/living_races.model";


@Injectable()
export class LivingRacesService {

    constructor(@InjectModel(LivingRaces) private lrRepository: typeof LivingRaces) {}

    // async create(dto: LivingRacesDto){
    //     return await this.lrRepository.create(dto)
    // }

    async getAll(){
        return await this.lrRepository.findAll()
    }

    async getAllByPlanet(){

    }


    findOneById(id: string): Promise<LivingRaces>{
        return this.lrRepository.findOne({
            where:{
                id,
            },
        })
    }

}
