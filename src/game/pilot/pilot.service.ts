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

            const comrade: Pilot = await this.getPilotByName(name)


            if (comrade) throw new HttpException( "Простите, но пилот с таким именем уже существует!", HttpStatus.CONFLICT)


            return await this.pilotRepository.create({name, description, race_id, rating, owner, image})
        } catch (e) {

            if(e instanceof HttpException){
                throw e
            }


            throw new HttpException("Не получается создать пилота!", HttpStatus.FORBIDDEN)
        }
    }

    async getAll() {
        return await this.pilotRepository.findAll({})
    }

    async findByUser(req: Request) {
        const user: Users = await this.jwtService.verify(req.headers.authorization.split(' ')[1])
        return await this.pilotRepository.findOne({
            where: {
                owner: user.id,
            },
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

    async updatePilot(id: string, dto: PilotDto){

        try {
            await this.pilotRepository.update({
                name: dto.name,
                race_id: dto.race_id,
                image: dto.image,
                description: dto.description,
                rating: dto.rating
            }, {where: {id: id}})

            return this.getPilotByName(dto.name)
        }catch (e){
            throw new HttpException("Не получилось обновить пилота!", HttpStatus.CONFLICT)
        }
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
