import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {Users} from "./users/model/users.model";
import {Sector} from "./models/sector.model";
import {MapModule} from "./map.module";
import {Planet} from "./models/planet.model";
import {Politics} from "./models/politics.model";
import {Race} from "./models/race.model";
import {Economics} from "./models/economics.model";
import {LivingRaces} from "./models/living_races.model";
import {UserRole} from "./users/model/user_role.model";
import {System} from "./models/system.model";
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {Spacebase} from "./models/spacebase.model";
import {SpacebaseType} from "./models/spacebase-type.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),

        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            autoLoadModels: false,
            models: [Users, UserRole, Sector, Sector, System, Planet, Politics,
                Race, Economics, LivingRaces, Spacebase, SpacebaseType,
            ],
        }),
        AuthModule, UsersModule, MapModule
    ],


})
export class AppModule {
}
