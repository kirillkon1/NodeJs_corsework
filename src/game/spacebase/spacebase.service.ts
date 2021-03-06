import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Base} from "./spacebase.model";
import { SpacebaseType } from "./spacebase-type/spacebase-type.model";

@Injectable()
export class SpacebaseService {

    constructor(@InjectModel(Base) private spacebaseRepository: typeof Base) {}

    async getAll(){
        return await this.spacebaseRepository.findAll({include: {all: true}})
    }

    findOneById(id: string): Promise<Base>{
        return this.spacebaseRepository.findOne({
            where:{
                id,
            },
            include:{model: SpacebaseType}
        })
    }

    findAllBySystemId(id: string): Promise<Base[]>{
        return this.spacebaseRepository.findAll({
            where:{
                system_id: id
            },
            include: [{model: SpacebaseType}]
        })
    }

    async removeOne(id: string): Promise<void>{
        const entity = await this.findOneById(id)
        await entity.destroy()
    }
}
