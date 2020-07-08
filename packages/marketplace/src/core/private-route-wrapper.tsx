import * as React from 'react'
// import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import { useSelector, useDispatch } from 'react-redux'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { Redirect, useLocation } from 'react-router'
import { getAuthRoute, getDefaultRoute } from '@/utils/auth-route'
import { authSetRefreshSession, setInitClientTermsAcceptedStateFromCookie } from '@/actions/auth'

import { getCookieString, COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE } from '@/utils/cookie'
import { selectLoginSession, selectRefreshSession } from '@/selector/auth'
import { ActionCreator } from '@/types/core'
import Routes from '@/constants/routes'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
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
}: {
  dispatch: Dispatch
  setInitClientTermsAcceptedStateFromCookie: ActionCreator<void>
}) => () => {
  dispatch(setInitClientTermsAcceptedStateFromCookie())
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const dispatch = useDispatch()

  React.useEffect(
    handleSetTermsAcceptFromCookie({
      dispatch,
      setInitClientTermsAcceptedStateFromCookie,
    }),
    [],
  )

  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)
  // const isTermAccepted = useSelector(selectIsTermAccepted)

  const hasSession = !!loginSession || !!refreshSession

  const location = useLocation()
  const type = 'CLIENT'

  const isFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE))

  const route = getDefaultRoute({
    isFirstTimeLoginComplete,
  })

  const cognitoClientId = window.reapit.config.cognitoClientId
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId, type, route)

  if (refreshParams && !hasSession) {
    dispatch(authSetRefreshSession(refreshParams))
    return null
  }

  if (location.pathname === '/') {
    const path = getAuthRoute()
    return <Redirect to={path} />
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId, route)
    return null
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      {/* Temporary comment due to https://github.com/reapit/foundations/issues/1055 */}
      {/*
        {loginType === 'CLIENT' && (
          <ClientWelcomeMessageModal
            visible={!isTermAccepted}
            onAccept={handleOnAcceptClientWelcome({ dispatch, setClientTermAcceptedCookieAndState })}
            />
      )}
        */}
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive
          hasPadding
          flexColumn
          // I want to allow scrolling beyond the end of the page to allow for the toast notification
          // except on the Gitbook page because the iframe handles it's own scrolling
          isPageContainer={location.pathname !== Routes.DEVELOPER_API_DOCS}
        >
          <Suspense
            fallback={
              <Section>
                <Loader />
              </Section>
            }
          >
            {children}
          </Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
