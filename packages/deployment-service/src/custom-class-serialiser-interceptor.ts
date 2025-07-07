import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
  PlainLiteralObject,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { LoginIdentity } from '@reapit/connect-session'

@Injectable()
export class CustomClassSerialiserInterceptor extends ClassSerializerInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context)
    const options = {
      ...this.defaultOptions,
      ...contextOptions,
    }

    const request = context.switchToHttp().getRequest()
    const user: LoginIdentity = request.credentials

    const groups = user?.groups || []

    options.groups = [...(options.groups || []), ...groups]

    return next
      .handle()
      .pipe(map((res: PlainLiteralObject | Array<PlainLiteralObject>) => this.serialize(res, options)))
  }
}
