import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {SpaceshipType} from "./spaceship-type/spaceship-type.model";
import {Pilot} from "../pilot/pilot.model";
import {System} from "../system/system.model";

interface SpaceshipAttr {

    name: string
    spaceship_type_id: number
    pilot_id: number
    system_id: number
    image: string

}


@Table({tableName: 'spaceship', createdAt: false, updatedAt: false})
export class Spaceship extends Model<Spaceship, SpaceshipAttr> {

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Бронированный гипер-супер-мега-загаженный драндуль", description: "Имя корабля."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({example: "1", description: "id типа корабля"})
    @Column({type: DataType.NUMBER})
    @ForeignKey(() => SpaceshipType)
    spaceship_type_id: number

    @BelongsTo(() => SpaceshipType)
    spaceship_type: SpaceshipType

    @ApiProperty({example: "1", description: "id пилота"})
    @ForeignKey(() => Pilot)
    @Column({type: DataType.INTEGER, allowNull: false})
    pilot_id: number

    @BelongsTo(() => Pilot)
    pilot: Pilot

    @ApiProperty({example: "11", description: "id системы"})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => System)
    system_id: number

    @ApiProperty({example: '2FeiBW.png', description: 'Изображение корабля.'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string
}
