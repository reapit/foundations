import * as React from 'react'
import { History } from 'history'
import { useSelector } from 'react-redux'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { useHistory, useLocation } from 'react-router'
import AppList from '@/components/ui/app-list'
import AppSidebar from '@/components/ui/app-sidebar'
import { AppDetailState } from '@/reducers/app-detail'
import { selectAppSummary } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/client.scss?mod'
import { addQuery, hasFilterParams } from '@/utils/client-url-params'
import Routes from '@/constants/routes'

export const handleAfterClose = ({ setVisible }) => () => setVisible(false)
export const handleOnChange = history => (page: number) => {
  history.push(addQuery({ page }))
}

export interface onCardClickParams {
  setVisible: (isVisible: boolean) => void
  setStateViewBrowse: () => void
  appDetail: AppDetailState
  fetchAppDetail: (id: string, client: string) => void
  clientId: string
}

export const handleOnCardClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.CLIENT}/${app.id}`)
}

export const Client: React.FunctionComponent = () => {
  const history = useHistory()
  const location = useLocation()

  const appSummaryState = useSelector(selectAppSummary)
  const urlParams = new URLSearchParams(location.search)
  const page = Number(urlParams.get('page')) || 1

  const hasParams = hasFilterParams(location.search)
  const unfetched = !appSummaryState.data
  const loading = appSummaryState.isAppSummaryLoading
  const apps = appSummaryState?.data?.apps?.data || []
  const featuredApps = appSummaryState?.data?.featuredApps || []
  const { totalCount, pageSize } = appSummaryState?.data?.apps || {}

  return (
    <ErrorBoundary>
      <div id="page-client-apps-container" className={styles.clientContainer}>
        <AppSidebar />
        {unfetched || loading ? (
          <Loader />
        ) : (
          <div className={styles.clientContent}>
            {!hasParams && featuredApps.length > 0 && (
              <>
                <AppList
                  list={featuredApps}
                  title="Featured Apps"
                  loading={loading}
                  onCardClick={handleOnCardClick(history)}
                  infoType="CLIENT_APPS_EMPTY"
                  numOfColumn={3}
                />
                <div className={styles.divider} />
              </>
            )}
            <AppList
              list={apps}
              loading={loading}
              onCardClick={handleOnCardClick(history)}
              infoType={page > 1 || hasParams ? '' : 'CLIENT_APPS_EMPTY'}
              pagination={{
                totalCount,
                pageSize,
                pageNumber: page,
                onChange: handleOnChange(history),
              }}
              numOfColumn={3}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default Client
