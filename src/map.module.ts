import { Module } from '@nestjs/common';
import {Sector} from "./models/sector.model";
import {SequelizeModule} from "@nestjs/sequelize";
import { SectorService } from './services/sector.service';
import {SectorController} from "./controllers/sector.controller";
import {Economics} from "./models/economics.model";
import {Politics} from "./models/politics.model";
import {Planet} from "./models/planet.model";
import {Race} from "./models/race.model";
import {SystemService} from "./services/system.service";
import {PlanetService} from "./services/planet.service";
import {RaceService} from "./services/race.service";
import {PoliticsService} from "./services/politics.service";
import {EconomicsService} from "./services/economics.service";
import {SystemController} from "./controllers/system.controller";
import {PlanetController} from "./controllers/planet.controller";
import {RaceController} from "./controllers/race.controller";
import {PoliticsController} from "./controllers/politics.controller";
import {EconomicsController} from "./controllers/economics.controller";
import {LivingRaces} from "./models/living_races.model";
import {System} from "./models/system.model";


@Module({
    providers: [SectorService, SystemService, PlanetService, RaceService, PoliticsService, EconomicsService],
    controllers: [SectorController, SystemController, PlanetController, RaceController, PoliticsController, EconomicsController],
    imports: [SequelizeModule.forFeature([Sector, System, Planet, Politics, Race, Economics, LivingRaces])]
})
export class MapModule {}
