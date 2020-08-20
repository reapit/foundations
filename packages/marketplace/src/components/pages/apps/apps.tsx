import * as React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Dispatch } from 'redux'
import qs from 'query-string'
import { History } from 'history'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, Section, H3, Grid } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { useHistory, useLocation } from 'react-router'
import AppList from '@/components/ui/app-list'
import FeaturedApp from '@/components/ui/featured-app'
// Commenting out as we are disabling for launch because there are too few apps
// import AppSidebar from '@/components/ui/app-sidebar'
import { selectAppsListState, selectFeatureAppsListState } from '@/selector/apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { addQuery, hasFilterParams } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchApps } from '@/actions/apps'
import { getNumberOfItems } from '@/utils/browse-app'
import ComingSoonApps from './coming-soon'
import styles from '@/styles/pages/apps.scss?mod'

export const handleAfterClose = ({ setVisible }) => () => setVisible(false)
export const handleOnChange = history => (page: number) => {
  history.push(addQuery({ page }))
}

export const handleOnCardClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.APPS}/${app.id}`)
}

export const handleLoadMore = ({
  dispatch,
  preview,
  loading,
  numOfItemsPerPage,
  pageNumber,
}: {
  dispatch: Dispatch
  preview: boolean
  loading: boolean
  numOfItemsPerPage: number
  pageNumber: number
}) => () => {
  !loading &&
    dispatch(fetchApps({ pageNumber: pageNumber + 1, preview, isInfinite: true, pageSize: numOfItemsPerPage }))
}

export const Apps: React.FunctionComponent = () => {
  const [comingSoonAppSectionHeight, setComingSoonAppSectionHeight] = React.useState(0)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const appsListState = useSelector(selectAppsListState)
  const hasParams = hasFilterParams(location.search)
  const apps = appsListState?.data || []
  const { totalCount = 0, pageNumber = 1 } = appsListState || {}

  const featureAppsListState = useSelector(selectFeatureAppsListState)
  const featuredApps = featureAppsListState?.data || []
  const { preview: previewString } = qs.parse(location.search)
  const preview = !!previewString

  const numOfItemsPerPage = getNumberOfItems()
  const totalPage = totalCount / numOfItemsPerPage

  const loading = appsListState.isLoading || featureAppsListState.isLoading
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
        <InfiniteScroll
          dataLength={apps.length}
          next={handleLoadMore({ dispatch, preview, loading, numOfItemsPerPage, pageNumber })}
          hasMore={hasMore}
          loader={<Loader key="infiniteScrollLoader" />}
          scrollThreshold={`${comingSoonAppSectionHeight}px`}
          // We disable the scrolling in the app list  container and allow the app root container to scroll
          // so the scrollableTarget must be set as app-root-container
          scrollableTarget="app-root-container"
        >
          <TransitionGroup>
            <AppList
              list={apps}
              loading={loading}
              onCardClick={handleOnCardClick(history)}
              infoType={pageNumber > 1 || hasParams ? '' : 'CLIENT_APPS_EMPTY'}
              animated
            />
          </TransitionGroup>
        </InfiniteScroll>

        <div className="bb mb-4" />
        <ComingSoonApps setComingSoonAppSectionHeight={setComingSoonAppSectionHeight} />
      </Section>
    </ErrorBoundary>
  )
}

export default Apps
