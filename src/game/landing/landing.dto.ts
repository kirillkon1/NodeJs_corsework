import {ApiProperty} from "@nestjs/swagger";

export class LandingDto{

    @ApiProperty({example: '1', description: 'id корабля'})
    spaceship_id: number

    @ApiProperty({example: '1', description: 'id планеты'})
    planet_id: number

    @ApiProperty({example: '1', description: 'id базы'})
    spacebase_id: number

}