import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'action_type', createdAt: false, updatedAt: false})
export class ActionType extends Model<ActionType> {


    @ApiProperty({example: 1, description: "id типа действия."})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Сделать  плохо", description: "Название типа действия"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: -1, description: "Сколько будет давать рейтинга пилота, за действие такго типа." +
            "В базе может быть [-10. 10]"})
    @Column({type: DataType.INTEGER})
    action_impact: number

}
