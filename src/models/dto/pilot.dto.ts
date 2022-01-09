import {ApiProperty} from "@nestjs/swagger";

export class PilotDto{

    @ApiProperty({example: 'qwerty', description: 'Имя пилота'})
    name: string

    @ApiProperty({example: 'Это описание', description: 'Описание пилота'})
    description: string

    @ApiProperty({example: '1', description: 'id расы пилота'})
    race_id: number

    @ApiProperty({example: '11', description: 'рейтинг пилота (-100 < x < 100)'})
    rating: number

    @ApiProperty({example: '1', description: 'id пользователя'})
    owner: number

    @ApiProperty({example: 'human1.png', description: 'Изображение пилота'})
    image: string
}