import * as React from 'react'
// import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerBasic, AppNavContainer } from '@reapit/elements'
import { LoginType, RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { withRouter, Redirect } from 'react-router'
import { getDefaultRouteByLoginType, getAuthRouteByLoginType } from '@/utils/auth-route'
import {
  authSetRefreshSession,
  setInitDeveloperTermsAcceptedStateFromCookie,
  setInitClientTermsAcceptedStateFromCookie,
  setClientTermAcceptedCookieAndState,
} from '../actions/auth'

import {
  getCookieString,
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
} from '@/utils/cookie'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
  setInitClientTermsAcceptedStateFromCookie: () => void
  setInitDeveloperTermsAcceptedStateFromCookie: () => void
  setClientTermAcceptedCookieAndState: () => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
  isDesktopMode: boolean
  loginType: LoginType
  isTermAccepted: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  setRefreshSession,
  children,
  hasSession,
  loginType,
  location,
  setInitDeveloperTermsAcceptedStateFromCookie,
  setInitClientTermsAcceptedStateFromCookie,
  // isTermAccepted,
  // setClientTermAcceptedCookieAndState,
}) => {
  React.useEffect(() => {
    setInitClientTermsAcceptedStateFromCookie()
    setInitDeveloperTermsAcceptedStateFromCookie()
  }, [])

  const params = new URLSearchParams(location.search)
  const state = params.get('state')
  const type = state && state.includes('ADMIN') ? 'ADMIN' : state && state.includes('CLIENT') ? 'CLIENT' : loginType

  const isDeveloperFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE))
  const isClientFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE))

  const route = getDefaultRouteByLoginType({
    isClientFirstTimeLoginComplete,
    isDeveloperFirstTimeLoginComplete,
    /**
     * loginType default in reducer = DEVELOPER
     * when redirecting back to app after login
     *   -> use state in url param (this was setted by cognito)
     *   -> save the valid type to logintype
     * further works will use loginType in reducer if param state isn't specificied in url param
     */
    loginType: type || loginType,
  })

  const cognitoClientId = window.reapit.config.cognitoClientId
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId, type, route)

  if (refreshParams && !hasSession) {
    setRefreshSession(refreshParams)
    return null
  }

  if (type && location.pathname === '/') {
    const path = getAuthRouteByLoginType(type || loginType)
    return <Redirect to={path} />
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId, route, type)
    return null
  }

  return (
    <AppNavContainer>
      <Menu />
      {/* Temporary comment due to https://github.com/reapit/foundations/issues/1055 */}
      {/* {loginType === 'CLIENT' && (
        <ClientWelcomeMessageModal visible={!isTermAccepted} onAccept={setClientTermAcceptedCookieAndState} />
      )} */}
      <FlexContainerBasic isScrollable flexColumn>
        <Suspense
          fallback={
            <Section>
              <Loader />
            </Section>
          }
        >
          {children}
        </Suspense>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  loginType: state?.auth?.loginType,
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
  isTermAccepted: state?.auth?.isTermAccepted,
})

export const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
  setInitDeveloperTermsAcceptedStateFromCookie: () => {
    dispatch(setInitDeveloperTermsAcceptedStateFromCookie())
  },
  setInitClientTermsAcceptedStateFromCookie: () => {
    dispatch(setInitClientTermsAcceptedStateFromCookie())
  },
  setClientTermAcceptedCookieAndState: () => dispatch(setClientTermAcceptedCookieAndState(true)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
