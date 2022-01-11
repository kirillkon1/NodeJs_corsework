import {ApiProperty} from "@nestjs/swagger";

export class UpdateSpaceshipDto{

    @ApiProperty({example: '1', description: 'id корабля'})
    id: number

    @ApiProperty({example: 'qwerty', description: 'Название корабля'})
    name: string

    @ApiProperty({example: '1', description: 'тип корабля (по id)'})
    spaceship_type_id: number

    @ApiProperty({example: 'human1.png', description: 'Изображение корабля'})
    image: string
}