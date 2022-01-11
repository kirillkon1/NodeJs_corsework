import {ApiProperty} from "@nestjs/swagger";

export class LandingDto{

    @ApiProperty({example: '1', description: 'id корабля'})
    spaceship_id: number

    @ApiProperty({example: '1', description: 'id планеты (пустой если есть id станции)'})
    planet_id: number

    @ApiProperty({example: '1', description: 'id базы (пустой если есть id планеты)'})
    spacebase_id: number

}