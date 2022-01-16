import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {Users} from "./users/users.model";
import {Sector} from "./game/sector/sector.model";
import {GameModule} from "./game/gameModule";
import {Planet} from "./game/planet/planet.model";
import {Politics} from "./game/planet/politics/politics.model";
import {Race} from "./game/race/race.model";
import {Economics} from "./game/planet/economics/economics.model";
import {LivingRaces} from "./game/planet/living_races/living_races.model";
import {System} from "./game/system/system.model";
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {Base} from "./game/spacebase/spacebase.model";
import {SpacebaseType} from "./game/spacebase/spacebase-type/spacebase-type.model";
import {Pilot} from "./game/pilot/pilot.model";
import {Landing} from "./game/landing/landing.model";
import {Spaceship} from "./game/spaceship/spaceship.model";
import {SpaceshipType} from "./game/spaceship/spaceship-type/spaceship-type.model";
import {Action} from "./game/action/action.model";
import {ActionType} from "./game/action/action-type/action-type.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),

        SequelizeModule.forRoot({

            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            autoLoadModels: false,
            models: [Users, Sector, System, Planet, Politics,
                Race, Economics, LivingRaces, Base, SpacebaseType, Pilot, Landing,
                Spaceship, SpaceshipType, Action, ActionType
            ],
        }),
        AuthModule, UsersModule, GameModule
    ],


})
export class AppModule {
}
