import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  pingUserService() {
    const startTs = Date.now();
    return this.userClient.send<string>({ role: 'user', cmd: 'ping' }, {}).pipe(
      timeout(5000),
      map((message) => ({ message, duration: Date.now() - startTs })),
    );
  }

  async findOne(username: string): Promise<User | undefined> {
    const source$ = this.userClient
      .send({ role: 'user', cmd: 'find-one' }, { username })
      .pipe(timeout(2000));

    const result = await lastValueFrom(source$, {
      defaultValue: 'Usuário não encontrado!',
    });

    if (!result.userId) {
      return null;
    }

    return result;
  }
}
