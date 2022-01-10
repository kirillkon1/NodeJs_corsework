import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import {UserRole} from "./user-role/user_role.model";
import {AuthModule} from "../auth/auth.module";



@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([Users, UserRole])],
  exports: [UsersService]
})
export class UsersModule {}
