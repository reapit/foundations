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

import { selectLoginSession, selectRefreshSession } from '@/selector/auth'
import { ActionCreator } from '@/types/core'

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

  // FIXME: remove this fuck
  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)
  // const isTermAccepted = useSelector(selectIsTermAccepted)

  const hasSession = !!loginSession || !!refreshSession

  const location = useLocation()

  const route = getDefaultRoute()

  const cognitoClientId = window.reapit.config.cognitoClientId
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId, 'CLIENT', route)

  // FIXME: remove this
  if (refreshParams && !hasSession) {
    dispatch(authSetRefreshSession(refreshParams))
    return null
  }

  if (location.pathname === '/') {
    const path = getAuthRoute()
    return <Redirect to={path} />
  }

  // FIXME: remove this
  if (!hasSession) {
    redirectToOAuth(cognitoClientId, route)
    return null
  }

  // FIXME: wrap context
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
        <FlexContainerResponsive hasPadding flexColumn>
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
