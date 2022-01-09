
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Race} from "./race.model";
import {Users} from "../users/model/users.model";

interface PilotCreationAttr{
    name: string
    description: string
    race_id: number
    rating: number
    owner: number
    image: string
}


@Table({tableName: 'pilot', createdAt: false, updatedAt: false})
export class Pilot extends Model<Pilot, PilotCreationAttr>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Черкаш", description: "Имя пилота."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({example: "Черкаш - самый невозмутимый персонаж на этой планете.", description: "описание пилота"})
    @Column({type: DataType.STRING})
    description: string

    @ApiProperty({example: "1", description: "id расы пилота"})
    @ForeignKey(() => Race)
    @Column({type: DataType.INTEGER, allowNull: false})
    race_id: number

    @ApiProperty({example: "11", description: "Рейтинг пилота"})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    rating: number

    @ApiProperty({example: "1", description: "id пользователя, владеющего этим пилотом."})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(()=> Users)
    owner: number

    @ApiProperty({example: 'human1.png', description: 'Изображение пилота (100х100).'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string

}
