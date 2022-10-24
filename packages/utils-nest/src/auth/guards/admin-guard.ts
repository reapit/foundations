import { ExecutionContext, Injectable } from '@nestjs/common'
import { CredGuard, CredsType } from './cred-guard'
import { isReadonlyAdmin, isWriteAdmin } from './is-admin'

@Injectable()
export class AdminReadonlyGuard extends CredGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context)

    if (result) {
      const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()
      const creds = request.credentials

      return isReadonlyAdmin(creds)
    }

    return false
  }
}

@Injectable()
export class AdminWriteGuard extends CredGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context)

    if (result) {
      const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()
      const creds = request.credentials

      return isWriteAdmin(creds)
    }

    return false
  }
}
