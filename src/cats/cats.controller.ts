import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { CatsRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async singUp(@Body() body: CatsRequestDto) {
    return await this.catsService.singUp(body);
  }
}
