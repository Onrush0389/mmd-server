import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
    usersService: any;
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return 'hello';
    }

    @Post()
    async insertUser(@Body() user: CreateUserDto) {
      return this.userService.insertUser(user);
    }
    
}
