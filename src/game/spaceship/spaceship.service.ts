import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Spaceship} from "./spaceship.model";
import {JwtService} from "@nestjs/jwt";
import {Users} from "../../users/users.model";
import {Request} from "express";
import {Pilot} from "../pilot/pilot.model";
import {SpaceshipType} from "./spaceship-type/spaceship-type.model";
import {SystemService} from "../system/system.service";
import {SpaceshipDto} from "./dto/spaceship.dto";
import {MoveToSystemDto} from "./dto/moveToSystem.dto";
import {UpdateSpaceshipDto} from "./dto/updateSpaceship.dto";


@Injectable()
export class SpaceshipService {

    constructor(@InjectModel(Spaceship) private spaceshipRepository: typeof Spaceship,
                private readonly jwtService: JwtService, private readonly systemService: SystemService) {
    }

    async findAll() {
        return await this.spaceshipRepository.findAll({include: [{model: SpaceshipType}]})
    }


    async findAllIncludePilot() {
        return await this.spaceshipRepository.findAll({include: [{model: Pilot}, {model: SpaceshipType}]})
    }

    findOneById(id: string): Promise<Spaceship> {
        return this.spaceshipRepository.findOne({
            where: {
                id,
            },
            include: {all: true}
        })
    }

    async findAllByPilotId(id: string): Promise<Spaceship[]> {
        const ships: Spaceship[] = await this.spaceshipRepository.findAll({where:{pilot_id: id}, /*include: [/!*{model: Pilot},*!/ {model: SpaceshipType}]*/})

        return ships;

    }


    // async removeOne(id: string): Promise<void> {
    //     const entity = await this.findOneById(id)
    //     await entity.destroy()
    // }

    async findAllBySystemId(id: string) {
        return await this.spaceshipRepository.findAll({where: {system_id: id}, include: [{model: Pilot}, {model: SpaceshipType}]})
    }

    async createShip(dto: SpaceshipDto) {

        const verify_ship = await this.getByName(dto.name)

        if (verify_ship) throw new HttpException("Простите! Но корабль с таким именем уже существует!", HttpStatus.CONFLICT)

        try {
            return await this.spaceshipRepository.create(dto)
        } catch (e) {
            console.log(e);
            throw new HttpException("Не получилось создать корабль! Проверьте, на всякий случай создан ли пилот, тип_корабля" +
                " и система с соответсвующими id!", HttpStatus.CONFLICT)
        }
    }

    async moveToAnotherSystem(req: Request, dto: MoveToSystemDto): Promise<void> {

        const duplicate_ship: Spaceship = await this.findOneById(String(dto.spaceship_id))

        const user: Users = await this.jwtService.verify(req.headers.authorization.split(' ')[1])

        if (duplicate_ship.pilot.owner != user.id) throw new HttpException("Данный пилот вам не принадлежит!", HttpStatus.FORBIDDEN)

        await this.spaceshipRepository.update({system_id: dto.system_id}, {where: {id: dto.spaceship_id}})

    }

    async updateSpaceship(req: Request, dto: UpdateSpaceshipDto) {

        try {
            const verify_ship: Spaceship = await this.spaceshipRepository.findOne({where: {id: dto.id}, include: {model: Pilot}})

            if (!verify_ship) throw new HttpException( "Ваш корабль не был найден!", HttpStatus.CONFLICT)

            const user: Users = await this.jwtService.verify(req.headers.authorization.split(' ')[1])

            if (verify_ship.pilot.owner != user.id) throw new HttpException( "Данный корабль вам не принадлежит!", HttpStatus.CONFLICT)

            return await this.spaceshipRepository.update({
                    name: dto.name,
                    spaceship_type_id: dto.spaceship_type_id,
                    image: dto.image
                },
                {where: {id: verify_ship.id}})
        } catch (e) {

            if(e instanceof HttpException){
                throw e
            }

            throw new HttpException("Произошла ошибка обновления корабля! Проверьте все ли поля с id (даже пользователь) существуют!", HttpStatus.CONFLICT)
        }
    }


    private getByName(name: string): Promise<Spaceship> {
        return this.spaceshipRepository.findOne({where: {name: name}})
    }

}
