import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {Users} from "./users/users.model";
import {Sector} from "./models/sector.model";
import {MapModule} from "./map.module";
import {Planet} from "./models/planet.model";
import {Politics} from "./models/politics.model";
import {Race} from "./models/race.model";
import {Economics} from "./models/economics.model";
import {LivingRaces} from "./models/living_races.model";
import {UserRole} from "./users/user_role.model";
import {System} from "./models/system.model";

@Module({

    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Durka3228',
            database: 'postgres',
            models: [Users,UserRole, Sector, Sector, System, Planet, Politics, Race, Economics, LivingRaces],
        }),
        UsersModule, MapModule
    ],


})
export class AppModule{}
