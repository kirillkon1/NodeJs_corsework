import {ApiProperty} from "@nestjs/swagger";


export class PlanetDto {

    @ApiProperty({example: "Земля", description: "Название планеты."})
    name: string

    @ApiProperty({example: "1000", description: "Кол-во жителей (в тыс.). Может быть null"})
    citizens: number = 0

    @ApiProperty({example: "1", description: "id полит. строя"})
    politics: number

    @ApiProperty({example: "1", description: "id полит. строя"})
    economics: number

}