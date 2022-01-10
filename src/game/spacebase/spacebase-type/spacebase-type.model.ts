import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


@Table({tableName: 'spacebase_type', createdAt: false, updatedAt: false})
export class SpacebaseType extends Model<SpacebaseType> {

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Научная космическая станция", description: "Название типа станции."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @ApiProperty({example: "ЫЫЫАААААААА, Я УЧЁНЫЙ, ААААА!", description: "Описание"})
    @Column({type: DataType.STRING})
    description: string

    @ApiProperty({example: "PB.png", description: "Описание"})
    @Column({type: DataType.STRING})
    image: string

    @ApiProperty({example: '100', description: "Верхняя граница допустимого рейтинга."})
    @Column({type: DataType.INTEGER})
    rating_up: number

    @ApiProperty({example: '-100', description: "Нижняя граница допустимого рейтинга."})
    @Column({type: DataType.INTEGER})
    rating_down: number
}
