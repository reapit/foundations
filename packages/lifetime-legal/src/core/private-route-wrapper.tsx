import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import { selectUserLoginStatus } from '@/selectors/auth'
import { Loader, AppNavContainer } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { authSetRefreshSession } from '../actions/auth'
import Menu from '@/components/ui/menu'
import styles from '@/styles/index.scss?mod'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

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
  } & {
    children: React.ReactNode | React.ReactNodeArray
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  hasSession,
  setRefreshSession,
}: PrivateRouteWrapperProps) => {
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_LTL_APP as string
  const refreshParamsRaw = getTokenFromQueryString(location.search, cognitoClientId)
  const marketplaceGlobalObject = getMarketplaceGlobalsByKey()

  if (refreshParamsRaw && !hasSession) {
    const refreshParams: RefreshParams = { ...refreshParamsRaw, mode: marketplaceGlobalObject ? 'DESKTOP' : 'WEB' }
    setRefreshSession(refreshParams)
    return null
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId)
    return null
  }

  return (
    <AppNavContainer>
      <div className={styles.navbar}>
        <Menu />
      </div>
      <Suspense fallback={<Loader body />}>{children}</Suspense>
    </AppNavContainer>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: selectUserLoginStatus(state),
})

export const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
