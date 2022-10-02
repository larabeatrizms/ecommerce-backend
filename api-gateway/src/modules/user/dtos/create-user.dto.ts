import { ApiProperty } from '@nestjs/swagger';

class UserAddress {
  @ApiProperty()
  street: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  complement?: string;
}

export class CreateUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: UserAddress;
}
