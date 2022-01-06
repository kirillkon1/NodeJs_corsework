import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Users} from "../users/users.model";
import {Sector} from "../models/sector.model";

@Injectable()
export class SectorService {

    constructor(@InjectModel(Sector) private userRepository: typeof Sector) {}

    // async createUser(dto: UserDto){
    //     return await this.userRepository.create(dto)
    // }

    async getAllUsers(){
        return await this.userRepository.findAll()
    }

    findOne(id: string): Promise<Sector>{
        return this.userRepository.findOne({
            where:{
                id,
            },
        })
    }

    async removeOne(id: string): Promise<void>{
        const user = await this.findOne(id)
        await user.destroy()
    }
}
