import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


@Table({tableName: 'spacebase_type', createdAt: false, updatedAt: false})
export class SpacebaseType extends Model<SpacebaseType> {

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Научная станция", description: "Название типа станции."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    // @ApiProperty({example: 'WB.png', description: 'Изображение станции.'})
    // @Column({type: DataType.STRING, allowNull: false})
    // image: string

    @ApiProperty({example: "ЫЫЫЫЫЫЫЫЫЫ, Я дурак!!!", description: "Описание"})
    @Column({type: DataType.STRING})
    description: string

    @ApiProperty({example: "99", description: "нижняя граница допуска на станцию"})
    @Column({type: DataType.INTEGER})
    rating_down: number

    @ApiProperty({example: "-99", description: "верхняя граница допуска на станцию"})
    @Column({type: DataType.INTEGER})
    rating_up: number
}
