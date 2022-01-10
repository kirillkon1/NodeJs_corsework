
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Planet} from "../planet/planet.model";
import {Spacebase} from "../spacebase/spacebase.model";
import {Spaceship} from "../spaceship/spaceship.model";

interface LandingAttr {

    spaceship_id: number,
    planet_id: number,
    spacebase_id: number
}

@Table({tableName: 'landings', createdAt: false, updatedAt: false})
export class Landing extends Model<Landing, LandingAttr>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    landing_id: number

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Spaceship)
    spaceship_id: number

    @BelongsTo(() => Spaceship)
    spaceship: Spaceship

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Planet)
    planet_id: number

    @BelongsTo(() => Planet)
    planet: Planet

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Spacebase)
    spacebase_id: number
}
