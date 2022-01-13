import {ApiProperty} from "@nestjs/swagger";

export class ActionDto{

    @ApiProperty({description: "Описание действия", example: "Насрал мимо толчка."})
    action_description: string

    @ApiProperty({description: "Id пилота, который совершил действие", example: 1})
    pilot_id: number

    @ApiProperty({description: "Id типа поступка (разные степени тяжести)", example: 1})
    action_type_id: number
}