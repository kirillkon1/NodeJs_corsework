import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Users} from "./users.model";
import {UserDto} from "./dto/userDto";


@Injectable()
export class UsersService {

    constructor(@InjectModel(Users) private userRepository: typeof Users) {}

    async createUser(dto: UserDto){

        if(this.getUserByLogin(dto.login)){
            throw new HttpException("Пользователь с таким логином уже существует", HttpStatus.BAD_REQUEST)
        }

        return await this.userRepository.create(dto)
    }

    async getAllUsers(){
        return await this.userRepository.findAll()
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
        const user = this.userRepository.findOne({where: {login}})
    }
}
