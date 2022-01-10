
import {Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface PoliticsCreationAttr{
    name: string;
    description: string
}

@Table({tableName: 'politics', createdAt: false, updatedAt: false})
export class Politics extends Model<Politics, PoliticsCreationAttr>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Демократия", description: "Название политического строя."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string


    @ApiProperty({example: 'Форма правления, при которой народ имеет право выбирать своих правящих законодателей', description: "Описание политического строя."})
    @Column({type: DataType.STRING})
    description: string
}
