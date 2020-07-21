import * as React from 'react'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Menu from '../components/ui/menu'
import { redirectToOAuth } from '@reapit/cognito-auth'
import { AuthContext } from '../context'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  /**
   * TODO: remove this
   * required:t
   *
   * enter authenticated withou login rdirect login
   * enter authenticated with code -> (login and close) -> able access
   * enter authenticaed with normal login, should be eko
   */
  const { loginSession, refreshParams, getLoginSession, isFetchSession } = React.useContext(AuthContext)

  // TODO: change this
  if (!loginSession && !refreshParams) {
    redirectToOAuth(window.reapit.config.cognitoClientId)
    return null
  }

  // TODO: bin
  if (!loginSession && refreshParams && !isFetchSession) {
    getLoginSession(refreshParams)
  }

  // TODO: bin
  if (!loginSession) {
    return null
  }

  // TODO: bin
  if (isFetchSession) {
    return (
      <Section>
        <Loader />
      </Section>
    )
  }

  /**
   * TODO: add provide
   */
  return (
    <AppNavContainer>
      <Menu />
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

export default withRouter(PrivateRouteWrapper)
