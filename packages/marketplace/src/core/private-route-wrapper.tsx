import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerBasic, AppNavContainer } from '@reapit/elements'
import { LoginType, RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { authSetRefreshSession } from '../actions/auth'
import { getDefaultRouteByLoginType } from '@/utils/auth-route'
import { getCookieString, COOKIE_FIRST_TIME_LOGIN } from '@/utils/cookie'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
  isDesktopMode: boolean
  loginType: LoginType
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
}) => {
  const params = new URLSearchParams(location.search)
  const state = params.get('state')
  const type =
    state && state.includes('ADMIN') ? 'ADMIN' : state && state.includes('DEVELOPER') ? 'DEVELOPER' : loginType
  const firstLoginCookie = getCookieString(COOKIE_FIRST_TIME_LOGIN)
  const route = getDefaultRouteByLoginType(type, firstLoginCookie)
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_MARKETPLACE as string
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId, type, route)

  if (refreshParams && !hasSession) {
    setRefreshSession(refreshParams)
    return null
  }

  if (!hasSession) {
    console.log('no session, route', route)
    redirectToOAuth(cognitoClientId, route, type)
    return null
  }

  return (
    <AppNavContainer>
      <Menu />
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

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  loginType: state?.auth?.loginSession?.loginType ?? 'CLIENT',
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
