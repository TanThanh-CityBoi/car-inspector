import {
  Controller,
  Body,
  Patch,
  Request,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAccessTokenGuard } from '@auth/guards/jwt-access-token.guard';
import { _response } from '@/utils/response';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return _response({ data: req.user });
  }
}
