
import {BelongsTo,Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {System} from "./system.model";
import {SpacebaseType} from "./spacebase-type.model";


@Table({tableName: 'spacebase', createdAt: false, updatedAt: false})
export class Spacebase extends Model<Spacebase>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Унитаз Абобы", description: "Название станции."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({example: "1", description: "тип станции (в тыс.)"})
    @Column({type: DataType.INTEGER})
    @ForeignKey(() => SpacebaseType)
    spacebase_type_id: number

    @ApiProperty({example: "1", description: "id системы"})
    @ForeignKey(() => System)
    @Column({type: DataType.INTEGER})
    system_id: number

    @BelongsTo(()=> SpacebaseType)
    spacebase_type: SpacebaseType

}
