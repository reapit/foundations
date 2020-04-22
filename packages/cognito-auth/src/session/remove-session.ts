import { COOKIE_SESSION_KEY } from '../utils/cognito'
import hardtack from 'hardtack'

export const removeSession = (identifier: string = COOKIE_SESSION_KEY, appEnv?: string): void => {
  const identifierWithEnv = appEnv ? `${appEnv}-${identifier}` : identifier
  hardtack.remove(identifierWithEnv, {
    path: '/',
    domain: window.location.hostname,
  })
}
