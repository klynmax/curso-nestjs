import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";

import { CreateUserInputDTO } from "src/dtos/users/createUserInput.dto";
import { UpdateUserInputDTO } from "src/dtos/users/updateUserInput.dto";
import { UserService } from "src/services/user.service";
@Controller('users')
export class UserController {
    /**
     * Injetando as dependência
     */
    constructor(private usersService: UserService) {}

    @Get()
    findAll(@Query('id', new DefaultValuePipe(0), ParseIntPipe) id = 0) {
        return this.usersService.findAll(id);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this,this.usersService.findById(id);
    }

    @Post()
    create(@Body() body: CreateUserInputDTO) {

        return this.usersService.create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserInputDTO) { 
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}