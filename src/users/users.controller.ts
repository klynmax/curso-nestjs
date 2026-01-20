import { 
    Get,
    Put,
    Body,
    Post,
    Query,
    Param,
    Delete,
    Controller,
    ParseIntPipe,
    DefaultValuePipe,
} from "@nestjs/common";


import { UserService } from "src/users/users.service";
import { CreateUserInputDTO } from "./dtos/createUserInput.dto";
import { UpdateUserInputDTO } from "./dtos/updateUserInput.dto";
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