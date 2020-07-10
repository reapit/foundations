import * as React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import { History } from 'history'
import { Loader, Info, Pagination, H3 } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import AppList from '@/components/ui/app-list'
import { selectMyApps, selectDeveloperEditionId } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { selectIsAdmin } from '@/selector/auth'
import Routes from '@/constants/routes'
import { getParamsFromPath } from '@/utils/client-url-params'

export const handleOnChange = history => (page: number) => history.push(`${routes.MY_APPS}?page=${page}`)

export const handleOnSettingClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.APPS}/${app.id}/manage`)
}

export const AppsManagement: React.FunctionComponent = () => {
  const history = useHistory()
  const location = useLocation()

  const myAppsState = useSelector(selectMyApps)
  const isDesktopAdmin = useSelector(selectIsAdmin)
  const isDeveloperEdition = Boolean(useSelector(selectDeveloperEditionId))
  const isAdmin = isDesktopAdmin || isDeveloperEdition
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
      <H3 isHeadingSection>Manage Apps</H3>
      <AppList
        list={list}
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

export default AppsManagement
