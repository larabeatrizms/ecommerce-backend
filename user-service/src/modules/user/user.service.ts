import { Injectable, UnauthorizedException } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        userName: 'julia',
        password: 'changeme',
      },
      {
        userId: 2,
        userName: 'john',
        password: 'secret',
      },
    ];
  }

  async findOne(userName: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.userName === userName);

    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }
}
