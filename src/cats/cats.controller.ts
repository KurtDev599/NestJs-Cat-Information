import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsResponseDto } from './dto/cats.response.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@ApiResponse({
  status: 500,
  description: 'Server Error',
})
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatsResponseDto,
  })
  @Post()
  async singUp(@Body() body: CatsRequestDto) {
    return await this.catsService.singUp(body);
  }
}
