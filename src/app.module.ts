import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {Users} from "./users/users.model";
import {Sector} from "./models/sector.model";

@Module({

    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Durka3228',
            database: 'postgres',
            models: [Users, Sector],
        }),
        UsersModule
    ],

})
export class AppModule{}
