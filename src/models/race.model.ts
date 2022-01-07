import {Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'race', createdAt: false, updatedAt: false})
export class Race extends Model<Race>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Придурок", description: "Название расы."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string


    @ApiProperty({example: 'Часто встречающийся подвид человека. Основаная черта - нести и делать бред. Существтует также нецензурное название данного типа.', description: "Описание расы."})
    @Column({type: DataType.STRING})
    description: string
}
