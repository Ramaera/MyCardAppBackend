import { PrismaService } from 'nestjs-prisma';
import { Prisma, CardUser } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from '../common/configs/config.interface';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.cardUser.findUnique({
      where: {
        email,
      },
      include: {
        myCard: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for Email Id ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );
    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }
    const { accessToken, refreshToken } = this.generateTokens({
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }

  // ***************** Find User By Verification Token *************************

  async findByVerificationToken(token: string) {
    return this.prisma.cardUser.findFirst({
      where: {
        verificationToken: token,
      },
    });
  }

  //************************** Generate Verification Token ********************/
  async generateVerificationToken() {
    return crypto.randomBytes(30).toString('hex');
  }

  validateUser(userId: string): Promise<CardUser> {
    return this.prisma.cardUser.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<CardUser> {
    const id = this.jwtService.decode(token)['userId'];

    return this.prisma.cardUser.findUnique({
      where: { id },
      include: {
        myCard: true,
      },
    });
  }
  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
