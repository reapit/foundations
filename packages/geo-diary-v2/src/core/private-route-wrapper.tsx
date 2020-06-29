import * as React from 'react'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { redirectToOAuth } from '@reapit/cognito-auth'
import { AuthContext } from '@/context'
import ErrorBoundary from './error-boundary'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({ children }) => {
  const { loginSession, refreshParams, getLoginSession, isFetchSession } = React.useContext(AuthContext)

  if (!loginSession && !refreshParams) {
    redirectToOAuth(window.reapit.config.cognitoClientId)
    return null
  }

  if (!loginSession && refreshParams && !isFetchSession) {
    getLoginSession(refreshParams)
  }

  if (!loginSession) {
    return null
  }

  if (isFetchSession) {
    return (
      <Section>
        <Loader />
      </Section>
    )
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
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
