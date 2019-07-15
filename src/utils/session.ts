import { LoginSession } from '../reducers/auth'

export const setLoginSession = (session: LoginSession): void => {
  try {
    const sessionJSON = JSON.stringify(session)
    window.localStorage.setItem('reapit-app-store-session', sessionJSON)
  } catch (err) {
    console.error('ERROR SETTING SESSION', err.message)
  }
}

export const getLoginSession = (): LoginSession | null => {
  try {
    const sessionJSON = window.localStorage.getItem('reapit-app-store-session')
    if (sessionJSON) {
      return JSON.parse(sessionJSON) as LoginSession
    }
    return null
  } catch (err) {
    console.error('ERROR GETTING SESSION', err.message)
    return null
  }
}

export const removeLoginSession = (): void => {
  try {
    window.localStorage.removeItem('reapit-app-store-session')
  } catch (err) {
    console.error('ERROR REMOVING SESSION', err.message)
  }
}
