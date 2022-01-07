import {ApiProperty} from "@nestjs/swagger";

export class PoliticsDto {
    @ApiProperty({example: 'Анархичный балдёж', description: 'Название полит. строя'})
    name: string
    @ApiProperty({example: 'Народ бадлеет, но протянется это не долно...', description: 'Описание'})
    description: string
}