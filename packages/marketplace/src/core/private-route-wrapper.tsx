import * as React from 'react'
// import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import { useSelector, useDispatch } from 'react-redux'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerBasic, AppNavContainer } from '@reapit/elements'
import { getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { Redirect, useLocation } from 'react-router'
import { getDefaultRouteByLoginType, getAuthRouteByLoginType } from '@/utils/auth-route'
import {
  authSetRefreshSession,
  setInitDeveloperTermsAcceptedStateFromCookie,
  setInitClientTermsAcceptedStateFromCookie,
} from '@/actions/auth'

import {
  getCookieString,
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
} from '@/utils/cookie'
import { selectLoginSession, selectRefreshSession, selectLoginType } from '@/selector/auth'
import { ActionCreator } from '@/types/core'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
}

/* export const handleOnAcceptClientWelcome = ({
  dispatch,
  setClientTermAcceptedCookieAndState,
}: {
  dispatch: Dispatch
  setClientTermAcceptedCookieAndState: ActionCreator<boolean>
}) => () => dispatch(setClientTermAcceptedCookieAndState(true)) */

export const handleSetTermsAcceptFromCookie = ({
  dispatch,
  setInitClientTermsAcceptedStateFromCookie,
  setInitDeveloperTermsAcceptedStateFromCookie,
}: {
  dispatch: Dispatch
  setInitClientTermsAcceptedStateFromCookie: ActionCreator<void>
  setInitDeveloperTermsAcceptedStateFromCookie: ActionCreator<void>
}) => () => {
  dispatch(setInitClientTermsAcceptedStateFromCookie())
  dispatch(setInitDeveloperTermsAcceptedStateFromCookie())
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const dispatch = useDispatch()

  React.useEffect(
    handleSetTermsAcceptFromCookie({
      dispatch,
      setInitDeveloperTermsAcceptedStateFromCookie,
      setInitClientTermsAcceptedStateFromCookie,
    }),
    [],
  )

  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)
  const loginType = useSelector(selectLoginType)
  // const isTermAccepted = useSelector(selectIsTermAccepted)

  const hasSession = !!loginSession || !!refreshSession

  const location = useLocation()
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
    dispatch(authSetRefreshSession(refreshParams))
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
      {/*
        {loginType === 'CLIENT' && (
          <ClientWelcomeMessageModal
            visible={!isTermAccepted}
            onAccept={handleOnAcceptClientWelcome({ dispatch, setClientTermAcceptedCookieAndState })}
            />
      )}
        */}
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

export default PrivateRouteWrapper
