import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../user/interfaces/user.interface';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService, // private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.signIn({ email, password });

    if (user) {
      delete user.password;

      return user;
    }

    return null;
  }

  async login(user: UserInterface) {
    return {
      user_id: user.id,
      access_token: this.jwtService.sign({
        firstName: user.firstName,
        email: user.email,
        sub: user.id,
      }),
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    const token = await this.login(user);

    const forgotLink = `http://localhost:3000/auth/change-password?token=${token.access_token}`;

    console.log({ forgotLink });

    // await this.mailService.send({
    //   from: this.configService.get<string>('JS_CODE_MAIL'),
    //   to: user.email,
    //   subject: 'Forgot Password',
    //   html: `
    //         <h3>Hello ${user.firstName}!</h3>
    //         <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
    //     `,
    // });
  }
}
