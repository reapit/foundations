import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import InstalledAppList from '@/components/ui/installed-app-list'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { getParamsFromPath } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import { selectInstalledApps } from '@/selector/client'

export const handleOnChange = history => (page: number) => history.push(`${routes.INSTALLED_APPS}?page=${page}`)

export const handleOnCardClick = (app: AppSummaryModel) => handleLaunchApp(app)

export const InstalledApps: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const installedAppsState = useSelector(selectInstalledApps)

  const queryParams = getParamsFromPath(location.search)
  const { page: pageNumber = 1 } = queryParams

  const unfetched = !installedAppsState.installedAppsData
  const loading = installedAppsState.loading
  const list = installedAppsState?.installedAppsData?.data?.data || []
  const { totalCount, pageSize } = installedAppsState?.installedAppsData?.data || {}
  const { code, state } = getParamsFromPath(history.location.search)

  if (unfetched || loading) {
    return <Loader />
  }

  // redirect to browser app page if no app installed and come from login page
  if (code && state && !list.length) {
    return <Redirect to={Routes.CLIENT} />
  }

  return (
    <ErrorBoundary>
      <InstalledAppList
        list={list}
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

export default InstalledApps
