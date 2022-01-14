import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Sector} from "./sector.model";
import {System} from "../system/system.model";

@Injectable()
export class SectorService {

    constructor(@InjectModel(Sector) private sectorRepository: typeof Sector) {}

    async getAll(){
        return await this.sectorRepository.findAll({include: {model: System}})
    }

    findOneById(id: string): Promise<Sector>{
        return this.sectorRepository.findOne({
            where:{
                id,
            },
            include: {model: System}
        })
    }

    async removeOne(id: string): Promise<void>{
        const entity = await this.findOneById(id)
        await entity.destroy()
    }
}
