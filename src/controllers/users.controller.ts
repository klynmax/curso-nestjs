import { Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

@Controller('users')
export class UserController {
    @Get()
    findAll(@Query('id') id: number) {
        if(id) {
            return 'Teste de rota /users ' + id
        }
        return 'Teste de rota /users';
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return id;
    }

    @Post()
    create() {
        return 'create user';
    }

    @Put(':id')
    update(@Param('id') id: number) {
        return 'update user ' + id;
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return 'update user ' + id;
    }
}