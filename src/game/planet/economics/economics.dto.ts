import {ApiProperty} from "@nestjs/swagger";

export class EconomicsDto {
    @ApiProperty({example: 'Капитализм', description: 'Название типа экономики'})
    name: string
    @ApiProperty({example: 'Сижу-пержу и ем хлеб', description: 'Описание'})
    description: string
}