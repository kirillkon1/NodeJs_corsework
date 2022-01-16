import {ApiProperty} from "@nestjs/swagger";

export class SpaceshipDto{

    @ApiProperty({example: 'qwerty', description: 'Название корабля'})
    name: string;

    @ApiProperty({example: '1', description: 'тип корабля (по id)'})
    spaceship_type_id: number;

    @ApiProperty({example: '1', description: 'Пилот (по id)'})
    pilot_id: number;

    system_id: number;

    @ApiProperty({example: 'human1.png', description: 'Изображение корабля'})
    image: string;
}