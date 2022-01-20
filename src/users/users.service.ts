import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {InjectModel} from '@nestjs/sequelize';
import {Users} from "./users.model";
import {UserDto} from "./userDto";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class UsersService {

    constructor(@InjectModel(Users) private userRepository: typeof Users,
                private readonly jwtService: JwtService) {}

    async createUser(dto: UserDto){
        return await this.userRepository.create(dto)
    }

    async getAllUsers(){
        return await this.userRepository.findAll({include: {all: true}})
    }

    async findOne(id: number): Promise<Users>{
        return this.userRepository.findOne({
            where:{
                id,
            },
        })
    }

    async findMe(req: Request)
    {
        const AuthHeader = req.headers.authorization;

        const bearer = AuthHeader.split(' ')[0]
        const token = AuthHeader.split(' ')[1]
        if (bearer != 'Bearer' || !token) {
            throw new HttpException('The token isn\'t set.', HttpStatus.BAD_REQUEST);
        }

        const jwtData: Users = this.jwtService.verify(token);

        const user = await this.findOne(jwtData.id);

        if (!user) throw new HttpException('The user doesn\'t exist.', HttpStatus.NOT_FOUND);
        return {
            id: user.id,
            login: user.login
        };
    }

    async removeOne(id: number): Promise<void>{
        const user = await this.findOne(id)
        await user.destroy()
    }

    async getUserByLogin(login: string){
        const user = this.userRepository.findOne({where: {login}, include: {all: true}})
        return user
    }
}
