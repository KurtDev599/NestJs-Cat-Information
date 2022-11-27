import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsResponseDto } from './dto/cats.response.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@ApiResponse({
  status: 500,
  description: 'Server Error',
})
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatsResponseDto,
  })
  @Post('signUp')
  async singUp(@Body() body: CatsRequestDto) {
    return await this.catsService.singUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }
}
