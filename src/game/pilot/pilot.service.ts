import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Pilot} from "./pilot.model";
import {PilotDto} from "./pilot.dto";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {Users} from "../../users/users.model";

@Injectable()
export class PilotService {

    constructor(@InjectModel(Pilot) private pilotRepository: typeof Pilot, private jwtService: JwtService) {
    }

    async create(dto: PilotDto, req: Request) {

        try {
            const name: string = dto.name
            const description: string = dto.description
            const race_id: number = dto.race_id
            const rating: number = dto.rating
            const owner: number = this.jwtService.verify(req.headers.authorization.split(' ')[1]).id
            const image: string = dto.image

            const comrade:Pilot = await this.getPilotByName(name)

            console.log(comrade)

            if(comrade) return "Простите, но пилот с таким именем уже существует!"


            return await this.pilotRepository.create({name, description, race_id, rating, owner, image})
        } catch (e) {
            console.log(e)
            throw new HttpException("Не получается создать пилота!", HttpStatus.FORBIDDEN)
        }
    }

    async getAll() {
        return await this.pilotRepository.findAll({include: {all: true}})
    }

    async findByUserId(id: string) {
        return await this.pilotRepository.findOne({
            where: {
                owner: id,
            },
            include: {all: true}
        })
    }


    async findOneById(id: string): Promise<Pilot> {
        return await this.pilotRepository.findOne({
            where: {
                id,
            },
            include: {all: true}
        })
    }

    async removeOne(id: string, req: Request): Promise<void> {
        const entity: Pilot = await this.findOneById(id)
        const token = req.headers.authorization

        const user: Users = this.jwtService.verify(token.split(' ')[1])

        if (entity.owner != user.id) {
            throw new HttpException("Этот пилот вам не принадлежит!", HttpStatus.FORBIDDEN)
        }

        await entity.destroy()
    }


    private getPilotByName(name: string) {
        return this.pilotRepository.findOne({
            where: {
                name: name
            }
        })
    }
}
