import { ApiProperty } from '@nestjs/swagger';

export class ShowUserDto {
  @ApiProperty()
  id: number;
}
