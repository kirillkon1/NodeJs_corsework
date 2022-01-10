
import {Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface EconomicsCreationAttr{
    name: string;
    description: string
}

@Table({tableName: 'economics', createdAt: false, updatedAt: false})
export class Economics extends Model<Economics, EconomicsCreationAttr>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Аграрная", description: "Название экономики."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({example: "Преобладает сельское хозяйство.", description: "Описание типы экономики."})
    @Column({type: DataType.STRING})
    description: string
}
