import { COOKIE_SESSION_KEY } from '../utils/cognito'
import hardtack from 'hardtack'

export const removeSession = (): void => {
  hardtack.remove(COOKIE_SESSION_KEY, {
    path: '/',
    domain: window.location.host,
  })
}
