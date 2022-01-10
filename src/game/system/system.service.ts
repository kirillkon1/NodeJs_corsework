import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {System} from "./system.model";


@Injectable()
export class SystemService {

    constructor(@InjectModel(System) private systemRepository: typeof System) {}

    async getAll(){
        return await this.systemRepository.findAll({include: {all: true}})
    }

    findAllBySectorId(sectorId: string): Promise<System[]>{
        return this.systemRepository.findAll({where: {sector: sectorId}, include: {all: true}})
    }

    findOneById(id: string): Promise<System>{
        return this.systemRepository.findOne({
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
