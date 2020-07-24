import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
// import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { Dispatch } from 'redux'
import { Redirect, useLocation } from 'react-router'
import { getAuthRoute } from '@/utils/auth-route'
import { setInitClientTermsAcceptedStateFromCookie } from '@/actions/auth'
import { useDispatch } from 'react-redux'
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
  const session = useReapitConnect(reapitConnectBrowserSession)
  const dispatch = useDispatch()

  React.useEffect(
    handleSetTermsAcceptFromCookie({
      dispatch,
      setInitClientTermsAcceptedStateFromCookie,
    }),
    [],
  )

  // FIXME: remove this fuck
  // const isTermAccepted = useSelector(selectIsTermAccepted)

  // FIXME(auth): use repait

  const location = useLocation()

  // FIXME: remove this

  if (!session.connectSession) {
    return null
  }

  if (location.pathname === '/') {
    const path = getAuthRoute()
    return <Redirect to={path} />
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
