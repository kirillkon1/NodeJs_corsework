import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import {Sector} from "../models/sector.model";
import { SectorService } from '../services/sector.service';
import {SectorController} from "../controllers/sector.controller";


@Module({
  providers: [UsersService, SectorService],
  controllers: [UsersController, SectorController],
  imports: [SequelizeModule.forFeature([Users, Sector])]
})
export class UsersModule {}
