
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Planet} from "../planet/planet.model";
import {Spacebase} from "../spacebase/spacebase.model";
import {Spaceship} from "../spaceship/spaceship.model";
import {Pilot} from "../pilot/pilot.model";
import {ActionType} from "./action-type/action-type.model";

interface CreateActionAttr {

    action_description: string

    pilot_id: number

    action_type_id: number
}

@Table({tableName: 'action', createdAt: false, updatedAt: false})
export class Action extends Model<Action, CreateActionAttr>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.DATE})
    date: Date

    @Column({type: DataType.STRING})
    action_description: string

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Pilot)
    pilot_id: number

    @BelongsTo(() => Pilot)
    pilot: Pilot

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => ActionType)
    action_type_id: number

    @BelongsTo(() => ActionType)
    action_type: ActionType
}
