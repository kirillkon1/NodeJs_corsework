import {Column, DataType, Model, Table } from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'user_role', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "USER", description: "Роль пользователя."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    role_name: string
}
