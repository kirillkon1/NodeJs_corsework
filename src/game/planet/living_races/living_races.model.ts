
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Planet} from "../planet.model";
import {Race} from "../../race/race.model";

@Table({tableName: 'living_races', createdAt: false, updatedAt: false})
export class LivingRaces extends Model<LivingRaces>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Planet)
    planet_id: number

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Race)
    race_id: number
}
