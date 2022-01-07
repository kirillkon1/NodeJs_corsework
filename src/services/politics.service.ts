import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import { Politics } from 'src/models/politics.model';
import {PoliticsDto} from "../models/dto/politics.dto";

@Injectable()
export class PoliticsService {

    constructor(@InjectModel(Politics) private politicsRepository: typeof Politics) {}

    async create(dto: PoliticsDto){
        return await this.politicsRepository.create(dto)
    }

    async getAll(){
        return await this.politicsRepository.findAll()
    }

    findOneById(id: string): Promise<Politics>{
        return this.politicsRepository.findOne({
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
