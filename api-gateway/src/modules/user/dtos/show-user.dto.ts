import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ShowUserDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
