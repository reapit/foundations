import * as React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import { History } from 'history'
import { Loader, Info, Pagination } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import AppList from '@/components/ui/app-list'
import { selectMyApps } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { selectIsAdmin } from '@/selector/auth'
import Routes from '@/constants/routes'
import { getParamsFromPath } from '@/utils/client-url-params'

export const handleOnChange = history => (page: number) => history.push(`${routes.MY_APPS}?page=${page}`)

export const handleOnSettingClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.CLIENT}/${app.id}/manage`)
}

export const ClientAppsManagement: React.FunctionComponent = () => {
  const history = useHistory()
  const location = useLocation()

  const myAppsState = useSelector(selectMyApps)
  const isAdmin = useSelector(selectIsAdmin)
  const queryParams = getParamsFromPath(location.search)
  const { page: pageNumber = 1 } = queryParams

  const unfetched = !myAppsState.myAppsData
  const loading = myAppsState.loading
  const list = myAppsState?.myAppsData?.data?.data || []
  const { totalCount, pageSize } = myAppsState?.myAppsData?.data || {}

  if (unfetched || loading) {
    return <Loader />
  }
  if (!isAdmin) return <Info infoType="404" />

  return (
    <ErrorBoundary>
      <AppList
        list={list}
        title="Manage Apps"
        loading={loading}
        onCardClick={(app: AppSummaryModel) => handleLaunchApp(app)}
        onSettingsClick={handleOnSettingClick(history)}
        infoType="INSTALLED_APPS_EMPTY"
      />
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        pageNumber={pageNumber}
        onChange={handleOnChange(history)}
      />
    </ErrorBoundary>
  )
}

export default ClientAppsManagement
