import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    // Do not expose password
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async register(data: { email: string; password: string; name: string }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestException('Email already registered.');
    }

    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    const { password, ...safeUser } = user;
    return safeUser;
  }

  // Generate JWT payload
  createToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  async login(user: any) {
    const token = this.createToken(user);
    return { access_token: token };
  }

  async validateGoogleUser(email: string, name: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          password: '', // No password for Google OAuth
        },
      });
    }

    const token = this.createToken(user);
    return { access_token: token };
  }
}
