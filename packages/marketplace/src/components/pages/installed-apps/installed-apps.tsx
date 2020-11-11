import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router'
import { Loader, H3, isMobile } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import InstalledAppList from '@/components/pages/installed-apps/installed-app-list'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { getParamsFromPath } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import { selectAppsListState } from '@/selector/apps'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { cx } from 'linaria'

export const handleOnChange = history => (page: number) => history.push(`${routes.INSTALLED_APPS}?page=${page}`)

export const handleOnCardClick = (connectIsDesktop: Boolean) => (app: AppSummaryModel) =>
  handleLaunchApp(app, connectIsDesktop)

export const InstalledApps: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const installedAppsState = useSelector(selectAppsListState)
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  const queryParams = getParamsFromPath(location.search)
  const { page: pageNumber = 1 } = queryParams

  const unfetched = !installedAppsState.data
  const loading = installedAppsState.isLoading
  const list = installedAppsState?.data || []
  const { totalCount, pageSize } = installedAppsState || {}
  const { code, state } = getParamsFromPath(history.location.search)

  // redirect to browser app page if no app installed and come from login page
  if (code && state && !list.length) {
    return <Redirect to={Routes.APPS} />
  }

  return (
    <ErrorBoundary>
      <H3 className={cx(isMobile() && 'text-center')} isHeadingSection>
        Installed Apps
      </H3>
      {unfetched || loading ? (
        <Loader />
      ) : (
        <InstalledAppList
          list={list}
          loading={loading}
          onCardClick={handleOnCardClick(connectIsDesktop)}
          infoType="INSTALLED_APPS_EMPTY"
          pagination={{
            totalCount,
            pageSize,
            pageNumber,
            onChange: handleOnChange(history),
          }}
        />
      )}
    </ErrorBoundary>
  )
}

export default InstalledApps
