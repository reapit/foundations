import { ServerContext } from './handle.context'

export const checkPermission = (context: ServerContext) => {
  const isPermit = !!context.authorization
  return isPermit
}
