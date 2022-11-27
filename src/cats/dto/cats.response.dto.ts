import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class CatsResponseDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '1234',
    description: 'id',
  })
  id: string;
}
