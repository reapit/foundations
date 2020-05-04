import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { ReduxState } from '@/types/core'
import { InstalledAppsState } from '@/reducers/installed-apps'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import InstalledAppList from '@/components/ui/installed-app-list'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '../../utils/launch-app'
import { getCookieString, COOKIE_CLIENT_IS_LOAD_INSTALLED_APP_FROM_LOGIN, setCookieString } from '@/utils/cookie'
import Routes from '@/constants/routes'

export interface InstalledAppsMappedProps {
  installedAppsState: InstalledAppsState
}

export type InstalledAppsProps = InstalledAppsMappedProps & RouteComponentProps<{ page?: any }>

export const handleOnChange = history => (page: number) => history.push(`${routes.INSTALLED_APPS}/${page}`)

export const handleOnCardClick = (app: AppSummaryModel) => handleLaunchApp(app)

export const isFromLoginPage = () => {
  const isFromLogin = getCookieString(COOKIE_CLIENT_IS_LOAD_INSTALLED_APP_FROM_LOGIN)
  setCookieString(COOKIE_CLIENT_IS_LOAD_INSTALLED_APP_FROM_LOGIN, '')
  return isFromLogin
}

export const InstalledApps: React.FC<InstalledAppsProps> = ({ installedAppsState, match, history }) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !installedAppsState.installedAppsData
  const loading = installedAppsState.loading
  const list = installedAppsState?.installedAppsData?.data?.data || []
  const { totalCount, pageSize } = installedAppsState?.installedAppsData?.data || {}

  if (unfetched || loading) {
    return <Loader />
  }

  if (isFromLoginPage() && !list.length) return <Redirect to={Routes.CLIENT} />

  return (
    <ErrorBoundary>
      <InstalledAppList
        list={list}
        title="Installed Apps"
        loading={loading}
        onCardClick={handleOnCardClick}
        infoType="INSTALLED_APPS_EMPTY"
        pagination={{
          totalCount,
          pageSize,
          pageNumber,
          onChange: handleOnChange(history),
        }}
      />
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): InstalledAppsMappedProps => ({
  installedAppsState: state.installedApps,
})
const withRedux = connect(mapStateToProps, null)
const EnhancedInstalledApps = compose<React.FC>(withRouter, withRedux)(InstalledApps)
EnhancedInstalledApps.displayName = 'EnhancedInstalledApps'
export default EnhancedInstalledApps
