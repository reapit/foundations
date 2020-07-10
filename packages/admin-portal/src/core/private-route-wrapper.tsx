import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Redirect, useLocation } from 'react-router'
import { authSetRefreshSession } from '@/actions/auth'
import { selectLoginSession, selectRefreshSession, selectLoginType } from '@/selector/auth'
import Routes from '@/constants/routes'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const dispatch = useDispatch()
  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)
  const loginType = useSelector(selectLoginType)

  const hasSession = !!loginSession || !!refreshSession

  const location = useLocation()

  const route = `${window.location.origin}${Routes.ADMIN_APPROVALS}`

  const cognitoClientId = window.reapit.config.cognitoClientId
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId, 'ADMIN', route)

  if (refreshParams && !hasSession) {
    dispatch(authSetRefreshSession(refreshParams))
    return null
  }

  if (loginType && location.pathname === '/') {
    return <Redirect to={Routes.LOGIN} />
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId, route, 'ADMIN')
    return null
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive hasPadding flexColumn isPageContainer>
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
