import { PartialType } from "@nestjs/mapped-types";
import { CreateUserInputDTO } from "./createUserInput.dto";

export class UpdateUserInputDTO extends PartialType(CreateUserInputDTO) {}