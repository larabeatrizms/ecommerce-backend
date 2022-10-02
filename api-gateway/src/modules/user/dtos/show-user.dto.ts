import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ShowUserDto {
  @ApiProperty()
  @IsString()
  id: string;
}
