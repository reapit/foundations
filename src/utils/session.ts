import store from '@/core/store'
import { RefreshParams, tokenExpired, refreshCognitoSession } from '@reapit/elements'
import { authLoginSuccess, authLogout } from '@/actions/auth'
import { selectOnlineStatus } from '@/selectors/online'

export const getAccessToken = async (): Promise<string | null> => {
  const { loginSession, refreshSession } = store.state.auth
  const online = selectOnlineStatus(store.state)

  if (!online) {
    store.dispatch(authLogout())
    return null
  }

  if (!loginSession && !refreshSession) {
    store.dispatch(authLogout())
    return null
  }

  if (loginSession) {
    const sessionExpired = tokenExpired(loginSession.accessTokenExpiry)

    if (!sessionExpired) {
      return loginSession.accessToken
    }
  }

  const sessionToRefresh = (loginSession || refreshSession) as RefreshParams

  try {
    const refreshedSession = await refreshCognitoSession(sessionToRefresh)

    if (refreshedSession) {
      store.dispatch(authLoginSuccess(refreshedSession))
      return refreshedSession.accessToken
    }
  } catch (err) {
    console.error(err)
  }

  store.dispatch(authLogout())
  return null
}
