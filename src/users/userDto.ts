import {ApiProperty} from "@nestjs/swagger";

export class UserDto {

    @ApiProperty({example: 'admin', description: 'Логин пользователя'})
    readonly login: string

    @ApiProperty({example: 'admin123 (хэш)', description: 'Пароль пользователя'})
    readonly password: string
}