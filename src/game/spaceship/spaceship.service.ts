import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Spaceship} from "./spaceship.model";
import {SpaceshipDto} from "./dto/spaceship.dto";
import {JwtService} from "@nestjs/jwt";
import {Users} from "../../users/users.model";
import {Request} from "express";
import {MoveToSystemDto} from "./dto/moveToSystemDto";


@Injectable()
export class SpaceshipService {

    constructor(@InjectModel(Spaceship) private spaceshipRepository: typeof Spaceship, private readonly jwtService: JwtService) {
    }

    async getAll() {
        return await this.spaceshipRepository.findAll({include: {all: true}})
    }

    findOneById(id: string): Promise<Spaceship> {
        return this.spaceshipRepository.findOne({
            where: {
                id,
            },
            include: {all: true}
        })
    }


    async removeOne(id: string): Promise<void> {
        const entity = await this.findOneById(id)
        await entity.destroy()
    }

    async findAllBySystemId(id: string) {
        return await this.spaceshipRepository.findAll({where: {system_id: id}, include: {all: true}})
    }

    async createNewShip(dto: SpaceshipDto) {

        const duplicate_ship = await this.getByName(dto.name)

        if(duplicate_ship) throw new HttpException("Простите! Но корабль с таким именем уже существует!", HttpStatus.CONFLICT)

        try {
            return await this.spaceshipRepository.create(dto)
        } catch (e) {
            throw new HttpException("Не получилось создать корабль!", HttpStatus.CONFLICT)
        }
    }

    async moveToAnotherSystem(req: Request, dto: MoveToSystemDto): Promise<void> {

        const ship: Spaceship = await this.findOneById(String(dto.spaceship_id))

        const user: Users = await this.jwtService.verify(req.headers.authorization.split(' ')[0])

        if (ship.pilot.owner != user.id) throw new HttpException("Данный пилот вам не принадлежит!", HttpStatus.FORBIDDEN)

        await this.spaceshipRepository.update({system_id: dto.system_id}, {where: {id: dto.spaceship_id}})

    }


    private getByName(name: string): Promise<Spaceship> {
        return  this.spaceshipRepository.findOne({where: {name: name}})
    }
}
