import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { authSetRefreshSession } from '../actions/auth'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
  isDesktopMode: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  setRefreshSession,
  children,
  location,
  hasSession,
}) => {
  const cognitoClientId = 'process.env.COGNITO_CLIENT_ID'
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId)

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

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
