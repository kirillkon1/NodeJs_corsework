import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Sector} from "./sector.model";

@Injectable()
export class SectorService {

    constructor(@InjectModel(Sector) private sectorRepository: typeof Sector) {}

    async getAll(){
        return await this.sectorRepository.findAll()
    }

    findOneById(id: string): Promise<Sector>{
        return this.sectorRepository.findOne({
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
