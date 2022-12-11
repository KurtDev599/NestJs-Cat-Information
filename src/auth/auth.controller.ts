import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CatsLoginSuccessDto,
  CatsResponseDto,
} from '../cats/dto/cats.response.dto';
import { CatsRequestDto } from '../cats/dto/cats.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CatsDeleteUserSuccessDto } from './dto/delete.request.dto';

@Controller('auth')
@ApiResponse({
  status: 500,
  description: 'Server Error',
})
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
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatsLoginSuccessDto,
  })
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '탈퇴' })
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatsDeleteUserSuccessDto,
  })
  @Delete()
  async deleteUser(@CurrentUser() cat) {
    return this.authService.deleteUser(cat);
  }
}
