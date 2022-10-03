import { ExecutionContext, Injectable } from '@nestjs/common'
import { CredGuard, CredsType } from './cred-guard'

@Injectable()
export class AdminGuard extends CredGuard {
  // TODO change for get/post
  private readonly adminGroup = 'ReapitEmployee'

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context)

    if (result) {
      const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()
      const creds = request.credentials

      return creds.type === 'jwt' && creds.groups.includes(this.adminGroup)
    }

    return false
  }
}
