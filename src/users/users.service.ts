import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserInputDTO } from "./dtos/createUserInput.dto";
import { UpdateUserInputDTO } from "./dtos/updateUserInput.dto";

@Injectable()
export class UserService {
    private users = [
        {
            id: 1,
            name: 'Luiz Inácio',
            email: 'fazol@email.com',
            password: '123'
        },
        {
            id: 2,
            name: 'Flávio Caça Rato',
            email: 'paidemagrao@email.com',
            password: '123'
        },
        {
            id: 3,
            name: 'Eliza Sanches',
            email: 'sanches_ousadah@email.com',
            password: '123'
        },
    ];

    findAll(id: number) {
        if(id) {
            const user = this.users.find((user) => user.id === id);
            return [user].filter((user) => user)
        }
        return this.users;
    }
    
    findById( id: number) {
        const user = this.users.find((user) => user.id === id);
        if (user) return user
            throw new NotFoundException('Usuário não encontrado');
    }

    create(body: CreateUserInputDTO) {
        const user = this.users.find((user) => user.email === body.email);
        if(user) {
            throw new BadRequestException('Email já cadastrado');
        }
        const lastUser = this.users[this.users.length - 1];
            const newUser = {
                id: lastUser.id + 1,
                ...body
            }
            this.users.push(newUser);
            return newUser;
    }

    update(id: number, body: UpdateUserInputDTO) {
        const user = this.users.find((result) => result.id === id);
            if(!user) throw new NotFoundException();
            this.users.map((result) => {
                if(result.id === id) {
                    return { ...result, ...body};
                }
                return result
            })
        return { ...user, ...body};
    }

    delete( id: number) {
            const user = this.users.find((result) => result.id === id);
            if(!user) throw new NotFoundException();
            this.users = this.users.filter((user) => user.id !== id);
            return { message: 'User deleted'}
        }
}