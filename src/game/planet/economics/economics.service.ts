import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {EconomicsDto} from "./economics.dto";
import {Economics} from "./economics.model";

@Injectable()
export class EconomicsService {

    constructor(@InjectModel(Economics) private ecoRepository: typeof Economics) {}

    async create(dto: EconomicsDto){
        return await this.ecoRepository.create(dto)
    }

    async getAll(){
        return await this.ecoRepository.findAll()
    }

    findOneById(id: string): Promise<Economics>{
        return this.ecoRepository.findOne({
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
