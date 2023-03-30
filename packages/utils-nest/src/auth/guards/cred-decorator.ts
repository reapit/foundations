import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Creds = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request & { credentials?: any }>()
  return request?.credentials
})
