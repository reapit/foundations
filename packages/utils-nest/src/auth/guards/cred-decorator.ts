import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { CredsType } from './cred-types'

export const Creds = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request & { credentials?: CredsType }>()
  return request?.credentials
})
