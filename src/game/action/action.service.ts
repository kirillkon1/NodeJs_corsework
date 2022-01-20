import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Action} from "./action.model";
import {Pilot} from "../pilot/pilot.model";
import {ActionDto} from "./action.dto";
import {ActionType} from "./action-type/action-type.model";
import {JwtService} from "@nestjs/jwt";
import {Users} from "../../users/users.model";
import {Request} from "express";

@Injectable()
export class ActionService {

    constructor(@InjectModel(Action) private actionRepository: typeof Action,
                @InjectModel(Pilot) private pilotRepository: typeof Pilot,
                @InjectModel(ActionType) private actionTypeRepository: typeof ActionType,
                private jwtService: JwtService) {
    }


    async performAction(req: Request, dto: ActionDto) {
        const pilot: Pilot = await this.pilotRepository.findOne({where: {id: dto.pilot_id}})

        //проверка пользователя
        const user: Users = await this.jwtService.verify(req.headers.authorization.split(' ')[1])
        if (pilot.owner != user.id) throw new HttpException("Данный пилот вам не принадлежит!", HttpStatus.FORBIDDEN)
        //

        const actionType: ActionType = await this.actionTypeRepository.findOne({where: {id: dto.action_type_id}})

        this.actionRepository.create(dto)

        pilot.rating += actionType.action_impact

        if (pilot.rating >= 100) pilot.rating = 100
        if (pilot.rating <= -100) pilot.rating = -100

        await this.pilotRepository.update({rating: pilot.rating}, {where: {id: pilot.id}})

        return {
            actionImpact: actionType.action_impact,
            newRating: pilot.rating
        }
    }

    async findAllActionTypes(): Promise<ActionType[]> {
        return this.actionTypeRepository.findAll()
    }


    async findRatingListByPilotId(pilot_id: number): Promise<Action[]> {
        return this.actionRepository.findAll({
            attributes: ["action_description", "date"],
            where: {pilot_id: pilot_id},
            include: [ActionType],
            limit: 30
        })
    }
}