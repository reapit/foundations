import store from '@/core/store'
import { authLoginSuccess, authLogout } from '@/actions/auth'
import { getSession } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_LTL_APP } from '../constants/api'

export const getAccessToken = async (): Promise<string | null> => {
  const { loginSession, refreshSession } = store.state.auth

  const session = await getSession(loginSession, refreshSession, COOKIE_SESSION_KEY_LTL_APP)

  if (session) {
    store.dispatch(authLoginSuccess(session))
    return session.accessToken
  }

  store.dispatch(authLogout())
  return null
}
