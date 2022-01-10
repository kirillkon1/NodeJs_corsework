import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRole} from "./user-role/user_role.model";

interface UserCreationAttr {
    login: string;
    password: string;
}

@Table({tableName: 'username', createdAt: false, updatedAt: false})
export class Users extends Model<Users, UserCreationAttr> {

    @ApiProperty({example: "1", description: `id объекта`})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "admin", description: "Логин пользователя. Должен быть уникальным."})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string

    @ApiProperty({example: "admin123 (хэш)", description: "Пароль пользователя."})
    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({example: 'ADMIN', description: "Роль пользователя (ADMIN/USER)."})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 1})
    @ForeignKey(() => UserRole)
    role_id: number

}
