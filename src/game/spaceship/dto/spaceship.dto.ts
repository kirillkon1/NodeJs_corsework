import {ApiProperty} from "@nestjs/swagger";

export class SpaceshipDto{

    @ApiProperty({example: 'qwerty', description: 'Название корабля'})
    name: string

    @ApiProperty({example: 'Это описание', description: 'тип корабля (по id)'})
    spaceship_type_id: string

    @ApiProperty({example: '1', description: 'Пилот (по id)'})
    pilot_id: number

    @ApiProperty({example: '11', description: 'Система (по id)'})
    system_id: number

    @ApiProperty({example: 'human1.png', description: 'Изображение корабля'})
    image: string
}