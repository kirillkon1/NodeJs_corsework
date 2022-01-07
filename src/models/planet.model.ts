
import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {System} from "./system.model";
import {Politics} from "./politics.model";
import {Economics} from "./economics.model";
import {Race} from "./race.model";
import {LivingRaces} from "./living_races.model";


@Table({tableName: 'planet', createdAt: false, updatedAt: false})
export class Planet extends Model<Planet>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Земля", description: "Название планеты."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string


    @ApiProperty({example: 'earth.png', description: 'Изображение системы (1700х1000).'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string

    @ApiProperty({example: "1000", description: "Кол-во жителей (в тыс.)"})
    @Column({type: DataType.INTEGER})
    citizens: number

    @ApiProperty({example: "1", description: "id полит. строя"})
    @ForeignKey(() => Politics)
    @Column({type: DataType.INTEGER})
    politics: number

    @ApiProperty({example: "1", description: "id полит. строя"})
    @ForeignKey(() => Economics)
    @Column({type: DataType.INTEGER})
    economics: number

    @ApiProperty({example: "1", description: "id системы"})
    @ForeignKey(() => System)
    @Column({type: DataType.INTEGER})
    system: number

    @ApiProperty({example: "[Придурки]", description: "Список рас"})
    @BelongsToMany(() => Race, () => LivingRaces)
    race: Race[]

}
