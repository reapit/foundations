import * as React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Dispatch } from 'redux'
import { History } from 'history'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, Section, H3, Grid } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { useHistory, useLocation } from 'react-router'
import AppList from '@/components/ui/app-list'
import FeaturedApp from '@/components/ui/featured-app'
// Commenting out as we are disabling for launch because there are too few apps
// import AppSidebar from '@/components/ui/app-sidebar'
import { AppDetailState } from '@/reducers/app-detail'
import { selectAppSummary } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { addQuery, hasFilterParams } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import InfiniteScroll from 'react-infinite-scroller'
import { clientFetchAppSummary } from '@/actions/client'
import styles from '@/styles/pages/apps.scss?mod'
import qs from 'query-string'
import { getNumberOfItems } from '@/utils/browse-app'

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
  history.push(`${Routes.APPS}/${app.id}`)
}

export const handleLoadMore = ({
  dispatch,
  preview,
  loading,
}: {
  dispatch: Dispatch
  preview: boolean
  loading: boolean
}) => (page: number) => {
  !loading && dispatch(clientFetchAppSummary({ page, preview }))
}

export const Apps: React.FunctionComponent = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const appSummaryState = useSelector(selectAppSummary)
  const hasParams = hasFilterParams(location.search)
  const loading = appSummaryState.isAppSummaryLoading
  const apps = appSummaryState?.data?.apps?.data || []
  const featuredApps = appSummaryState?.data?.featuredApps || []
  const { totalCount = 0, pageNumber = 1 } = appSummaryState?.data?.apps || {}
  const { preview: previewString } = qs.parse(location.search)
  const preview = !!previewString

  const numOfItemsPerPage = getNumberOfItems()
  const totalPage = totalCount / numOfItemsPerPage
  /**
   * When apps is empty or when loading app set hasMore = false to prevent trigger load more
   * Otherwise set hasMore = true when pageNumber (current page ) less then totalPage
   *
   */
  const hasMore = apps.length == 0 || loading ? false : pageNumber < totalPage

  return (
    <ErrorBoundary>
      <Section
        className={styles['app-list']}
        isFlex
        isFlexColumn
        hasPadding={false}
        hasMargin={false}
        hasBackground={false}
      >
        <InfiniteScroll
          useWindow={false}
          pageStart={1}
          loadMore={handleLoadMore({ dispatch, preview, loading })}
          hasMore={hasMore}
          loader={<Loader key="infiniteScrollLoader" />}
          initialLoad={false}
        >
          <TransitionGroup>
            <>
              {/* <AppSidebar /> */}
              <H3 isHeadingSection>Browse Apps</H3>
              {!hasParams && featuredApps.length > 0 && (
                <div className="pb-4 bb mb-4">
                  <Grid isMultiLine>
                    {featuredApps.map(app => (
                      <FeaturedApp key={app.id} app={app} />
                    ))}
                  </Grid>
                </div>
              )}
              <AppList
                list={apps}
                loading={loading}
                onCardClick={handleOnCardClick(history)}
                infoType={pageNumber > 1 || hasParams ? '' : 'CLIENT_APPS_EMPTY'}
                animated
              />
            </>
          </TransitionGroup>
        </InfiniteScroll>
      </Section>
    </ErrorBoundary>
  )
}

export default Apps
