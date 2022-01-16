import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserDto} from "../users/userDto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {Users} from "../users/users.model";


@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
    }

    private salt = 6

    async login(userDto: UserDto) {

        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);

        return {
            ...token,
            user: {
                id: user.id,
                login: user.login
            }
        }
    }


    async registration(userDto: UserDto) {
        const candidate = await this.userService.getUserByLogin(userDto.login)

        if (candidate) {
            throw new HttpException("Такой пользователь уже существует!", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, this.salt)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        const token = await this.generateToken(user);

        return {
            ...token,
            user: {
                id: user.id,
                login: user.login
            }
        }
    }


    async validateToken(req){

        try {
            const AuthHeader = req.headers.authorization;

            const bearer = AuthHeader.split(' ')[0]
            const token = AuthHeader.split(' ')[1]
            if (bearer != 'Bearer' || !token) {
                return false
            }

            const user: Users = this.jwtService.verify(token)
            return true

        } catch (e) {
            return false
        }
    }

    private async generateToken(user: Users) {
        const payload = {login: user.login, password: user.password, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }


    private async validateUser(userDto: UserDto) {
        const user = await this.userService.getUserByLogin(userDto.login)

        if(!user) throw new HttpException("Данного пользавателя не существует!", HttpStatus.BAD_REQUEST)

        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }

        throw new UnauthorizedException("Неверный логин или пароль!")
    }




}
