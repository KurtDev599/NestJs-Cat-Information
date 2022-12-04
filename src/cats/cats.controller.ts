import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsResponseDto } from './dto/cats.response.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { SuccessInterceptor } from '../common/success.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@ApiResponse({
  status: 500,
  description: 'Server Error',
})
@UseInterceptors(SuccessInterceptor) // Interceptor DI
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

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  async uploadImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    return 'test';
  }
}
