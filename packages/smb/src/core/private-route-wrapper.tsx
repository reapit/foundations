import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString, redirectToOAuth, getSessionCookie } from '@reapit/cognito-auth'
import { useAuthContext } from '@/context/auth-context'
import { COOKIE_SESSION_KEY } from '../constants/api'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children, location }) => {
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_APP_NAME as string
  const cookieParams = getSessionCookie(COOKIE_SESSION_KEY)
  const urlParams: RefreshParams | null = getTokenFromQueryString(location.search, cognitoClientId)
  const refreshParams = cookieParams ? cookieParams : urlParams
  const { loginSession, getLoginSession, fetching } = useAuthContext()

  if (!loginSession && !fetching && !refreshParams) {
    redirectToOAuth(cognitoClientId)
    return null
  }

  if (!loginSession && refreshParams) {
    getLoginSession(refreshParams)
  }

  if (!loginSession) {
    return null
  }

  return (
    <AppNavContainer>
      <Menu />
      <Suspense
        fallback={
          <Section>
            <Loader />
          </Section>
        }
      >
        {children}
      </Suspense>
    </AppNavContainer>
  )
}

export default withRouter(PrivateRouteWrapper)
