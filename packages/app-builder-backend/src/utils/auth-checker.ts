import { Context } from '../types'
import { AuthChecker } from 'type-graphql'

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
  return !!(context.accessToken && context.idToken)
}
