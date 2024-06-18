import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailService } from './../mail/mail.service';
import { AuthGuard, AuthGuardAdmin } from '../auth/auth.guards';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User as UserModel } from '@prisma/client';
import { UserService } from './prisma-users/prisma-users.service';

@Controller('users')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  async register(
    @Body() postData: { email: string; username: string; password: string },
  ) {
    await this.mailService.sendUserConfirmation(postData.email);

    return this.userService.createUser({
      email: postData.email,
      username: postData.username,
      password: postData.password,
      role: '0',
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() request: any): Promise<UserModel> {
    const [type, tokentemp] = request.headers.authorization?.split(' ') ?? [];
    const token = type === 'Bearer' ? tokentemp : undefined;
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    return this.userService.user({
      username: payload.username,
    });
  }

  @UseGuards(AuthGuardAdmin)
  @Put(':id/role')
  async updateUser(
    @Param() params: any,
    @Body()
    postData: {
      role: string;
    },
  ): Promise<UserModel> {
    return await this.userService.updateUser({
      where: { id: parseInt(params.id) },
      data: {
        role: postData.role, //0-reader, 1- admin
      },
    });
  }
}
