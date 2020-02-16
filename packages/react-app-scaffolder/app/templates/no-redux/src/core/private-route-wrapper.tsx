import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { useAuthContext } from '@/context/auth-context'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children, location }) => {
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_<%= nameInConstantCase %> as string
  const refreshParams: RefreshParams | null = getTokenFromQueryString(location.search, cognitoClientId)

  const { loginSession, refreshSession, setRefreshSession } = useAuthContext()
  const hasSession = loginSession || refreshSession

  if (refreshParams && !hasSession) {
    setRefreshSession(refreshParams)
    return null
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId)
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
