import {ApiProperty} from "@nestjs/swagger";

export class MoveToSystemDto{
    @ApiProperty({example: 1, description: 'Кто летит. (id корабля)'})
    spaceship_id: number

    @ApiProperty({example: 1, description: 'В какую систему летит. (id системы)'})
    system_id: number
}