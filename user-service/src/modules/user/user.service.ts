import { Injectable, UnauthorizedException } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'julia',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'john',
        password: 'secret',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }
}
