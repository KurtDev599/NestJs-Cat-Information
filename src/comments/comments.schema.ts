import { SchemaOptions, Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: 'cats',
  })
  @ApiProperty({
    example: '김땡땡',
    description: 'author',
    required: true,
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @Prop({
    required: true,
  })
  @ApiProperty({
    example: '어쩌구 저쩌구',
    description: 'contents',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @ApiProperty({
    example: '100',
    description: 'like count',
  })
  @IsPositive()
  likeCount: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @ApiProperty({
    example: '작성 대상 (게시물, 정보글)',
    description: 'author',
    required: true,
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
