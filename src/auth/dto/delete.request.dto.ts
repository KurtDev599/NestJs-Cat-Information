import { ApiProperty } from '@nestjs/swagger';

export class CatsDeleteUserSuccessDto {
  @ApiProperty({
    example: true,
    description: 'success',
  })
  data: true;
}
