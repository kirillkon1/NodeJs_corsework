import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import {Sector} from "../models/sector.model";
import { SectorService } from '../services/sector.service';
import {SectorController} from "../controllers/sector.controller";
import {UserRole} from "./user_role.model";


@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([Users, UserRole])]
})
export class UsersModule {}
