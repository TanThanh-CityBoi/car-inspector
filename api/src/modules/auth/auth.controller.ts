import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { _response } from '@/utils/response';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return _response({ data: result });
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  async refresh(@Request() req) {
    return _response({ data: req?.user });
  }
}
