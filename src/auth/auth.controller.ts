import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsResponseDto } from '../cats/dto/cats.response.dto';
import { CatsRequestDto } from '../cats/dto/cats.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { SuccessInterceptor } from '../common/success.interceptor';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
@ApiResponse({
  status: 500,
  description: 'Server Error',
})
@UseInterceptors(SuccessInterceptor) // Interceptor DI
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatsResponseDto,
  })
  @Post('signUp')
  async singUp(@Body() body: CatsRequestDto) {
    return await this.authService.singUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }
}
