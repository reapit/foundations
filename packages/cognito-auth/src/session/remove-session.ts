import { COOKIE_SESSION_KEY } from '../utils/cognito'
import hardtack from 'hardtack'

export const removeSession = (identifier: string = COOKIE_SESSION_KEY): void => {
  hardtack.remove(identifier, {
    path: '/',
    domain: window.location.hostname,
  })
}
