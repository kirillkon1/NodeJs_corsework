import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Pilot} from "../models/pilot.model";
import {PilotDto} from "../models/dto/pilot.dto";
import {ApiProperty} from "@nestjs/swagger";


class MoveToSystemDTO {

    @ApiProperty({example: '1', description: 'id системы'})
    system_id: number
    @ApiProperty({example: '1', description: 'id пилота'})
    pilot_id: number
}

@Injectable()
export class PilotService {

    constructor(@InjectModel(Pilot) private pilotRepository: typeof Pilot) {
    }

    async create(dto: PilotDto) {
        return await this.pilotRepository.create(dto)
    }

    async getAll() {
        return await this.pilotRepository.findAll()
    }

    findOneById(id: string): Promise<Pilot> {
        return this.pilotRepository.findOne({
            where: {
                id,
            },
        })
    }

    async removeOne(id: string): Promise<void> {
        const entity = await this.findOneById(id)
        await entity.destroy()
    }

    async moveToSystem(dto: MoveToSystemDTO) {

    }

}
