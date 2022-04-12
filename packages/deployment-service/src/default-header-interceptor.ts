import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Response } from 'express'

@Injectable()
export class DefaultHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>()

    response.setHeader('Access-Control-Allow-Origin', '*')

    return next.handle()
  }
}
