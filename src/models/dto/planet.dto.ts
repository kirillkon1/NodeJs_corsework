import {ApiProperty} from "@nestjs/swagger";
import {Column, DataType, ForeignKey} from "sequelize-typescript";
import {Politics} from "../politics.model";
import {Economics} from "../economics.model";

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