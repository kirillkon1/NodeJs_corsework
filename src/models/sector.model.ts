import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


@Table({tableName: 'sector', createdAt: false, updatedAt: false})
export class Sector extends Model<Sector> {

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Атланта", description: "Название сектора."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string


}
