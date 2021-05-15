import { AuthenticationError } from 'apollo-server-errors'
import { checkPermission } from './check-permission'
import { ServerContext } from './handle.context'
import errors from '../errors'

export type ResolverFunction<T, R> = (_: any, args: T, context: ServerContext) => R | Promise<R>

export const resolverHandler = <T, R>(func: ResolverFunction<T, R>) => (
  _: any,
  args: T,
  context: ServerContext,
): (R | Promise<R>) | AuthenticationError => {
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  // TODO add harder try catch wrapper
  return func(_, args, context)
}
