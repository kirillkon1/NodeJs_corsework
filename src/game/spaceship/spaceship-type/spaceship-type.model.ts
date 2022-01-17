
import {Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'spaceship_type', createdAt: false, updatedAt: false})
export class SpaceshipType extends Model<SpaceshipType>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Бронированный космолёт", description: "Название типа корабля."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({example: "Тяжелый, медленный, но капец какой бронированный", description: "Описание"})
    @Column({type: DataType.STRING})
    description: string
}
