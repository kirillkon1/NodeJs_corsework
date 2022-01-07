
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Planet} from "./planet.model";
import {Race} from "./race.model";

interface LivingRacesAttr{
    planet_id: number
    race_id: number
}

@Table({tableName: 'economics', createdAt: false, updatedAt: false})
export class LivingRaces extends Model<LivingRaces, LivingRacesAttr>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Planet)
    planet_id: number

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Race)
    race_id: number
}
