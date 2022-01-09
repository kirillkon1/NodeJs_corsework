import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {UserRole} from "./model/user_role.model";
import {UserRoleDto} from "./dto/userRole.dto";


@Injectable()
export class UserRoleService {

    constructor(@InjectModel(UserRole) private repo: typeof UserRole) {
    }

    async createUser(dto: UserRoleDto) {
        return await this.repo.create(dto)
    }

    async getAllUsers() {
        return await this.repo.findAll({include: {all: true}})
    }

    findOne(id: string): Promise<UserRole> {
        return this.repo.findOne({
            where: {id},
        })
    }

    async removeOne(id: string): Promise<void> {
        const user = await this.findOne(id)
        await user.destroy()
    }
}
