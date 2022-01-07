
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Sector} from "./sector.model";


@Table({tableName: 'systemsr', createdAt: false, updatedAt: false})
export class System extends Model<System>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Солнце", description: "Название системы."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    // @ApiProperty({example: 's1.png', description: 'Изображение системы (1700х1000).'})
    // @Column({type: DataType.STRING})
    // image: string

    @ApiProperty({example: "1", description: "id сектора"})
    @ForeignKey(() => Sector)
    @Column({type: DataType.INTEGER})
    sector: number
}
