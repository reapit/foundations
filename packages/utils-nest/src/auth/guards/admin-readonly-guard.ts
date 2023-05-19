import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { CredsType } from './cred-types'
import { isReadonlyAdmin } from '../helpers'

@Injectable()
export class AdminReadonlyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()
    const credentials = request.credentials

    if (!credentials) {
      console.warn('Make sure that a Cred guard is implemented before AdminReadonlyGuard')
      throw new UnauthorizedException()
    }

    return isReadonlyAdmin(credentials)
  }
}
