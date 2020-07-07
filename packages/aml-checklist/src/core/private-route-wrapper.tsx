import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import { Loader, AppNavContainer, FlexContainerBasic, FlexContainerResponsive } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import Menu from '@/components/ui/menu'
import { selectUserLoginStatus } from '@/selectors/auth'
import { Dispatch } from 'redux'
import { authSetRefreshSession } from '../actions/auth'
import Routes from '@/constants/routes'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  hasSession,
  setRefreshSession,
}) => {
  const cognitoClientId = window.reapit.config.cognitoClientId
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId)

  if (refreshParams && !hasSession) {
    setRefreshSession(refreshParams)
    return null
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId)
    return null
  }

  const hasBackground = location.pathname == Routes.RESULTS

  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic hasPadding flexColumn isScrollable>
        <FlexContainerResponsive flexColumn hasBackground={hasBackground}>
          <Suspense fallback={<Loader body />}>{children}</Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: selectUserLoginStatus(state),
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
