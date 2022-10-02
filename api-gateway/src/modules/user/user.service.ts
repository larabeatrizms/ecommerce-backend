import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { CreateUserDto } from './dtos/createUser.dto';
import { SignInInterface } from './interfaces/signin.interface';

export type User = any;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

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

  async signIn({
    email,
    password,
  }: SignInInterface): Promise<User | undefined> {
    try {
      const source$ = this.userClient
        .send(
          { role: 'user', cmd: 'sign-in' },
          {
            email,
            password,
          },
        )
        .pipe(timeout(2000));

      const result = await lastValueFrom(source$, {
        defaultValue: 'User not found.',
      });

      if (!result || result.message) {
        throw new UnauthorizedException(result.message);
      }

      return result;
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async createUser(user: CreateUserDto): Promise<User | undefined> {
    try {
      const source$ = this.userClient
        .send({ role: 'user', cmd: 'create-user' }, user)
        .pipe(timeout(2000));

      const result = await lastValueFrom(source$, {
        defaultValue: 'Could not create a user.',
      });

      if (!result || result.status === 'error') {
        throw new BadRequestException(result.message);
      }

      return result;
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(error);
    }
  }
}
