import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

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

}
