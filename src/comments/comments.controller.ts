import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from './Dto/comments.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 유저 프로필 댓글' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '댓글 등록' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() requestBody: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, requestBody);
  }

  @ApiOperation({ summary: '좋아요 클릭' })
  @Put('like/:id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
