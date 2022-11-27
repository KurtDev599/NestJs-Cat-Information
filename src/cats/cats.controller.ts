import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsResponseDto } from './dto/cats.response.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@ApiResponse({
  status: 500,
  description: 'Server Error',
})
@UseGuards(JwtGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '현재 내 정보' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatsResponseDto,
  })
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }
}
