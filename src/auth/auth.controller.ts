import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsResponseDto } from '../cats/dto/cats.response.dto';
import { CatsRequestDto } from '../cats/dto/cats.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
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
