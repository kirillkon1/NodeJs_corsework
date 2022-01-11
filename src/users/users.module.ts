import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {AuthModule} from "../auth/auth.module";
import {Users} from "./users.model";



@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([Users])],
  exports: [UsersService]
})
export class UsersModule {}
