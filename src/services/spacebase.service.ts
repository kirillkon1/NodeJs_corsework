import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Spacebase} from "../models/spacebase.model";

@Injectable()
export class SpacebaseService {

    constructor(@InjectModel(Spacebase) private spacebaseRepository: typeof Spacebase) {}

    // async create(dto: EconomicsDto){
    //     return await this.spacebaseRepository.create(dto)
    // }

    async getAll(){
        return await this.spacebaseRepository.findAll({include: {all: true}})
    }

    findOneById(id: string): Promise<Spacebase>{
        return this.spacebaseRepository.findOne({
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
