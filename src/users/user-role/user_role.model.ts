import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Users} from "../users.model";

interface UserRoleAttr{
    name: string,
    description: string
}



@Table({tableName: 'user_role', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole, UserRoleAttr>{

    @ApiProperty({example: "1", description: "id объекта"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "USER", description: "Роль пользователя."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    role_name: string

    @HasMany(() => Users)
    users: Users[];
}
