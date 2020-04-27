import store from '@/core/store'
import { authLoginSuccess, authLogout, authSetRefreshSession } from '@/actions/auth'
import { getSession } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_GEO_DIARY } from '../constants/api'

export const getAccessToken = async (): Promise<string | null> => {
  const { loginSession, refreshSession } = store.state.auth

  const session = await getSession(
    loginSession,
    refreshSession,
    COOKIE_SESSION_KEY_GEO_DIARY,
    window.reapit.config.appEnv,
  )

  if (session) {
    store.dispatch(authLoginSuccess(session))
    const oldRefreshSession = store.state.auth.refreshSession
    const refreshByTokenParams = ['refreshToken', 'userName', 'cognitoClientId']
    const isRefreshByToken = refreshByTokenParams.every(key => session[key])
    const isNeedToUpdate = refreshByTokenParams.some(key => !oldRefreshSession?.[key])
    // only update if oldRefreshSession refresh type is by authorizationCode,
    // to prevent "invalid_grant" error when refreshing token
    // https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
    if (isRefreshByToken && isNeedToUpdate) {
      store.dispatch(authSetRefreshSession({ ...session, redirectUri: null, state: null, authorizationCode: null }))
    }
    return session.accessToken
  }

  store.dispatch(authLogout())
  return null
}
