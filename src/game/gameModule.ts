import {Module} from '@nestjs/common';
import {SectorService} from "./sector/sector.service";
import {PoliticsService} from "./planet/politics/politics.service";
import {EconomicsService} from "./planet/economics/economics.service";
import {SystemService} from "./system/system.service";
import {RaceService} from "./race/race.service";
import {PlanetService} from "./planet/planet.service";
import {PilotService} from "./pilot/pilot.service";
import {SpaceshipService} from "./spaceship/spaceship.service";
import {SpacebaseService} from "./spacebase/spacebase.service";
import {PilotController} from "./pilot/pilot.controller";
import {SpaceshipController} from "./spaceship/spaceship.controller";
import {PlanetController} from "./planet/planet.controller";
import {PoliticsController} from "./planet/politics/politics.controller";
import {EconomicsController} from "./planet/economics/economics.controller";
import {SectorController} from "./sector/sector.controller";
import {RaceController} from "./race/race.controller";
import {SystemController} from "./system/system.controller";
import {SpacebaseController} from "./spacebase/spacebase.controller";
import {TestController} from "../test.controller";
import {Sector} from "./sector/sector.model";
import {Race} from "./race/race.model";
import {Politics} from "./planet/politics/politics.model";
import {Planet} from "./planet/planet.model";
import {System} from "./system/system.model";
import {Pilot} from "./pilot/pilot.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Spacebase} from "./spacebase/spacebase.model";
import {SpacebaseType} from "./spacebase/spacebase-type/spacebase-type.model";
import {Landing} from "./landing/landing.model";
import {Spaceship} from "./spaceship/spaceship.model";
import {SpaceshipType} from "./spaceship/spaceship-type/spaceship-type.model";
import {LandingService} from "./landing/landing.service";
import {LivingRaces} from "./planet/living_races/living_races.model";
import {Economics} from "./planet/economics/economics.model";
import {AuthModule} from "../auth/auth.module";



@Module({

    providers: [SectorService, SystemService, PlanetService, RaceService, PoliticsService, EconomicsService,
        SpacebaseService, PilotService, LandingService, SpaceshipService],

    controllers: [PilotController, SpaceshipController, SectorController, SystemController, PlanetController,
        RaceController, PoliticsController, EconomicsController, SpacebaseController, TestController],

    imports: [SequelizeModule.forFeature([Pilot, Sector, System, Planet, Politics,
        Race, Economics, LivingRaces, Spacebase, SpacebaseType, Landing, Spaceship, SpaceshipType]), AuthModule]
})
export class GameModule {
}
