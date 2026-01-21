import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserInputDTO } from "./dtos/createUserInput.dto";
import { UpdateUserInputDTO } from "./dtos/updateUserInput.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll(id: number) {
        if(id) {
            const user = await this.prisma.user.findUnique({ where: {id}});
            return user
        }
        const users =  await this.prisma.user.findMany();
        return users;
    }
    
    async findById( id: number) {
        const user = await this.prisma.user.findUnique({ where: {id}});
        if (user) return user
            throw new NotFoundException('Usuário não encontrado');
    }

    async create(body: CreateUserInputDTO) {
        const user = await this.prisma.user.findUnique({where: {email: body.email}});
        if(user) {
            throw new BadRequestException('Email já cadastrado');
        }
            const newUser = await this.prisma.user.create({
                data: body
            });
            return newUser;
    }

    async update(id: number, body: UpdateUserInputDTO) {
        let user = await this.findById(id);
        if(!user) throw new NotFoundException();
        user = await this.prisma.user.update({where: {id}, data: body});
        return user
    }

    async delete( id: number) {
        const user = await this.findById(id);
        if(!user) throw new NotFoundException();
        await this.prisma.user.delete({where: {id}})
        return { message: 'User deleted'}
    }
}