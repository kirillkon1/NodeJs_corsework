import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Users} from "./model/users.model";
import {UserDto} from "./dto/userDto";


@Injectable()
export class UsersService {

    constructor(@InjectModel(Users) private userRepository: typeof Users) {}

    async createUser(dto: UserDto){
        return await this.userRepository.create(dto)
    }

    async getAllUsers(){
        return await this.userRepository.findAll({include: {all: true}})
    }

    findOne(id: string): Promise<Users>{
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

    async getUserByLogin(login: string){
        const user = this.userRepository.findOne({where: {login}, include: {all: true}})
        return user
    }
}
