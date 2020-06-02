import * as React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { History } from 'history'
import { Loader, Info } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import AppList from '@/components/ui/app-list'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { selectMyApps } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { selectIsAdmin } from '@/selector/auth'
import Routes from '@/constants/routes'

export const handleOnChange = history => (page: number) => history.push(`${routes.MY_APPS}/${page}`)

export const handleOnSettingClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.CLIENT}/${app.id}`)
}

export const ClientAppsManagement: React.FunctionComponent = () => {
  const history = useHistory()
  const myAppsState = useSelector(selectMyApps)
  const isAdmin = useSelector(selectIsAdmin)
  const { page = 1 } = useParams()
  const pageNumber = Number(page)

  const unfetched = !myAppsState.myAppsData
  const loading = myAppsState.loading
  const list = myAppsState?.myAppsData?.data?.data || []
  const { totalCount, pageSize } = myAppsState?.myAppsData?.data || {}
  const [visible, setVisible] = React.useState(false)

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
        pagination={{
          totalCount,
          pageSize,
          pageNumber,
          onChange: handleOnChange(history),
        }}
      />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

export default ClientAppsManagement
