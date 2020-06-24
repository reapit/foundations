import * as React from 'react'
import { History } from 'history'
import { useSelector } from 'react-redux'
import { Loader, FlexContainerBasic, H3, GridThreeColItem, Grid, Pagination, Section } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { useHistory, useLocation } from 'react-router'
import AppList from '@/components/ui/app-list'
// Commenting out as we are disabling for launch because there are too few apps
// import AppSidebar from '@/components/ui/app-sidebar'
import { AppDetailState } from '@/reducers/app-detail'
import { selectAppSummary } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { addQuery, hasFilterParams } from '@/utils/client-url-params'
import Routes from '@/constants/routes'
import { MEDIA_INDEX } from '@/constants/media'
import featureImagePlaceHolder from '@/assets/images/default-feature-image.jpg'
import { Link } from 'react-router-dom'

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
      <FlexContainerBasic flexColumn dataTest="page-client-apps-container">
        {/* <AppSidebar /> */}
        {unfetched || loading ? (
          <Loader />
        ) : (
          <>
            <Section>
              <H3 className="mb-0">Browse Apps</H3>
            </Section>
            {!hasParams && featuredApps.length > 0 && (
              <div className="pb-4 bb mb-4">
                <Grid isMultiLine>
                  {featuredApps.map(app => {
                    const featureImageSrc = app?.media?.[MEDIA_INDEX.FEATURE_IMAGE]?.uri || featureImagePlaceHolder
                    return (
                      <GridThreeColItem className="" key={app.id}>
                        <div className="card">
                          <div className="card-image">
                            <Link className="image" to={`${Routes.CLIENT}/${app.id}`}>
                              <img key={app.id} src={featureImageSrc} />
                            </Link>
                          </div>
                        </div>
                      </GridThreeColItem>
                    )
                  })}
                </Grid>
              </div>
            )}
            <AppList
              list={apps}
              loading={loading}
              onCardClick={handleOnCardClick(history)}
              infoType={page > 1 || hasParams ? '' : 'CLIENT_APPS_EMPTY'}
            />
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              pageNumber={page}
              onChange={handleOnChange(history)}
            />
          </>
        )}
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default Client
