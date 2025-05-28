// src/auth/guards/auth-jwt.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { configs } from '../../configs';
import { UserRepository } from '../../users/users.repository';
import { DecodedToken } from '../interface/decoded-token.interface';
@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private async decodeToken(token: string): Promise<DecodedToken | false> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: configs.JWT_SECRET,
      });

      return decodedToken;
    } catch {
      return false;
    }
  }

  private async validateRequest(request: Request): Promise<boolean> {
    const headerBearerToken = request.headers.authorization ?? null;
    const queryBearerToken = (request.query.authorization as string) ?? null;

    if (!headerBearerToken && !queryBearerToken) {
      throw new UnauthorizedException(
        'Please provide Bearer token in Authorization header.',
      );
    }

    const token = queryBearerToken ?? headerBearerToken.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found in header.');
    }

    const decoded = await this.decodeToken(token);

    if (!decoded) {
      throw new HttpException(
        'Invalid or expired token. Please log in again.',
        419,
      );
    }
    const user = await this.userRepository.getById(decoded.id);

    if (!user) {
      throw new UnauthorizedException('Invalid user id.');
    }

    request['user'] = user;

    return true;
  }
}
