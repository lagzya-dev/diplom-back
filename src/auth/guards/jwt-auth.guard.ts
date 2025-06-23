import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {

    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid JWT token');
    }

    if (info instanceof Error && info.message === 'No auth token') {
      throw new UnauthorizedException('Authorization token is missing');
    }
    context.getRequest()["user"] = user;
    return super.handleRequest(err, user, info, context, status);
  }
}
