import * as React from 'react'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { redirectToOAuth } from '@reapit/cognito-auth'
import { AuthContext } from '@/context'
import Routes from '@/constants/routes'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { loginSession, refreshParams, getLoginSession } = React.useContext(AuthContext)

  if (!loginSession && !refreshParams) {
    redirectToOAuth(window.reapit.config.cognitoClientId)
    return null
  }

  if (!loginSession && refreshParams) {
    getLoginSession(refreshParams)
  }

  if (!loginSession) {
    return null
  }

  if (location.pathname === '/') {
    return <Redirect to={Routes.HOME} />
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
