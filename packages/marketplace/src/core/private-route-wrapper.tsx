import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import TermsAndConditionsModal from '@/components/ui/terms-and-conditions-modal'
import { Loader, Section, FlexContainerBasic, AppNavContainer } from '@reapit/elements'
import { LoginType, RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { withRouter, Redirect } from 'react-router'
import { getDefaultRouteByLoginType, getAuthRouteByLoginType } from '@/utils/auth-route'
import { authSetRefreshSession, checkTermsAcceptedWithCookie, setTermsAcceptedWithCookie } from '../actions/auth'
import { getCookieString, COOKIE_FIRST_TIME_LOGIN } from '@/utils/cookie'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
  checkTermsAcceptedWithCookie: () => void
  setTermsAcceptedWithCookie: () => void
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
  checkTermsAcceptedWithCookie,
  setTermsAcceptedWithCookie,
  isTermAccepted,
}) => {
  React.useEffect(checkTermsAcceptedWithCookie, [])

  const params = new URLSearchParams(location.search)
  const state = params.get('state')
  const type = state && state.includes('ADMIN') ? 'ADMIN' : state && state.includes('CLIENT') ? 'CLIENT' : loginType

  const firstLoginCookie = getCookieString(COOKIE_FIRST_TIME_LOGIN)
  const route = getDefaultRouteByLoginType(type, firstLoginCookie)
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_MARKETPLACE as string
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId, type, route)

  if (type && location.pathname === '/') {
    const path = getAuthRouteByLoginType(type)
    return <Redirect to={path} />
  }

  if (refreshParams && !hasSession) {
    setRefreshSession(refreshParams)
    return null
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId, route, type)
    return null
  }

  return (
    <AppNavContainer>
      <Menu />
      <TermsAndConditionsModal
        visible={!isTermAccepted}
        onAccept={setTermsAcceptedWithCookie}
        tapOutsideToDissmiss={false}
      />
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
  loginType: state.auth.loginType,
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
  isTermAccepted: state.auth.isTermAccepted,
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
  checkTermsAcceptedWithCookie: () => {
    dispatch(checkTermsAcceptedWithCookie())
  },
  setTermsAcceptedWithCookie: () => dispatch(setTermsAcceptedWithCookie(true)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
