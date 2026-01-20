import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CreateUserInputDTO } from "src/dtos/users/createUserInput.dto";
import { UpdateUserInputDTO } from "src/dtos/users/updateUserInput.dto";
@Controller('users')
export class UserController {
    @Get()
    findAll(
        @Query('id') id: number
    ) {
        if(id) {
            return 'Teste de rota /users ' + id
        }
        return 'Teste de rota /users';
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return id;
    }

    @Post()
    create(@Body() body: CreateUserInputDTO) {
        return body;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateUserInputDTO) {
        return body;
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return 'update user ' + id;
    }
}