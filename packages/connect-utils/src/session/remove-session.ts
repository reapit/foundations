import { COOKIE_SESSION_KEY } from '../utils/cognito'

export const removeSession = (identifier: string = COOKIE_SESSION_KEY, appEnv?: string): void => {
  const identifierWithEnv = appEnv ? `${appEnv}-${identifier}` : identifier

  window.localStorage.removeItem(identifierWithEnv)
}
