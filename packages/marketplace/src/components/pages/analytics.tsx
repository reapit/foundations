import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Table,
  FlexContainerBasic,
  H3,
  H5,
  SubTitleH5,
  SelectBox,
  SelectBoxOptions,
  Formik,
  Form,
  Loader,
  toLocalTime,
  Pagination,
  setQueryParams
} from '@reapit/elements'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppSummaryModel, InstallationModel, PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import { DeveloperState } from '@/reducers/developer'
import { AppInstallationsState } from '@/reducers/app-installations'
import { fetchInstallations } from '@/sagas/app-installations'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import { AppDetailState } from '@/reducers/app-detail'
import { RouteComponentProps, withRouter } from 'react-router'
import Routes from '@/constants/routes'
import { Dispatch } from 'redux'
import { appDetailRequestData } from '@/actions/app-detail'

const COLUMNS = [
  {
    Header: 'Client',
    accessor: 'client'
  },
  {
    Header: 'Date of installation',
    accessor: row => toLocalTime(row.created)
  },
  {
    Header: 'Date of Uninstallation',
    accessor: row => {
      return row.terminatesOn ? toLocalTime(row.terminatesOn) : ''
    }
  }
]

export interface AnalyticsPageMappedProps {
  appsOfDeveloper?: DeveloperState
  appInstallations?: AppInstallationsState | null
  appDetail: AppDetailState
}

export interface AnalyticsPageMappedActions {
  requestAppDetailData: (data) => void
}

export type AnalyticsPageProps = AnalyticsPageMappedProps &
  AnalyticsPageMappedActions &
  RouteComponentProps<{ page: any }>

export const transformListAppToSelectBoxOptions = (app: AppSummaryModel) => {
  return { label: app.name ?? 'Error', value: app.id ?? 'Error' }
}

export const transformAppInstalationsToTableColumsCompatible = (appName?: string) => (
  appInstalls: InstallationModel
) => {
  return { ...appInstalls, appName }
}

export const handleSubmit = (history, appId, pageNumber = 1) => {
  const query = setQueryParams({ appId }) ? `?${setQueryParams({ appId })}` : ''
  history.push(`${Routes.DEVELOPER_ANALYTICS}/${pageNumber}${query}`)
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  appInstallations,
  appsOfDeveloper,
  appDetail,
  requestAppDetailData
}) => {
  // const pageNumber = match.params.page ? Number(match.params.page) : 1
  const [appId, setAppId] = React.useState<string>('')
  const [pageNumber, setPageNumber] = React.useState<number>(1)
  const [installations, setInstallations] = React.useState<PagedResultInstallationModel_>()
  const [fetchingInstallations, setFetchingInstallations] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (appId) {
      setFetchingInstallations(true)
      requestAppDetailData({ id: appId })
      fetchInstallations({ appId: [appId], pageNumber, pageSize: INSTALLATIONS_PER_PAGE }).then(response => {
        const isOnWrongPage = pageNumber > Math.ceil(response.totalCount / response.pageSize)
        const notEmptyData = response.totalCount > 0
        setFetchingInstallations(false)
        if (isOnWrongPage && notEmptyData) {
          setPageNumber(1)
        } else {
          setInstallations(response)
        }
      })
    } else {
      setInstallations({})
    }
  }, [appId, pageNumber])

  if (appInstallations?.loading || !appInstallations?.installationsAppData) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <H3>Analytics</H3>
        <H5>Total number of installations: {appInstallations.installationsAppData.totalCount}</H5>
        <SubTitleH5>To see specific installations please select an App from the list below:</SubTitleH5>
        <Formik
          initialValues={{ appId }}
          onSubmit={values => {
            setAppId(values.appId)
          }}
        >
          {({ submitForm }) => (
            <>
              <Form onChange={() => submitForm()}>
                <div style={{ width: 'max-content', maxWidth: '40%', marginBottom: '1rem' }}>
                  <SelectBox
                    id="appId"
                    labelText=""
                    name="appId"
                    options={
                      appsOfDeveloper?.developerData?.data?.data?.map<SelectBoxOptions>(
                        transformListAppToSelectBoxOptions
                      ) ?? []
                    }
                  />
                </div>

                {fetchingInstallations ? (
                  <Loader />
                ) : (
                  installations?.data && (
                    <>
                      <Table
                        scrollable
                        columns={COLUMNS}
                        data={
                          installations?.data?.map(
                            transformAppInstalationsToTableColumsCompatible(appDetail?.appDetailData?.data?.name)
                          ) ?? []
                        }
                        loading={false}
                      />
                      <br />
                      <Pagination
                        pageNumber={pageNumber}
                        onChange={pageNumber => {
                          setPageNumber(pageNumber)
                        }}
                        pageSize={INSTALLATIONS_PER_PAGE}
                        totalCount={installations?.totalCount}
                      />
                      <H5>
                        Total number of installations for {appDetail?.appDetailData?.data?.name}:{' '}
                        {installations?.totalCount}
                      </H5>
                    </>
                  )
                )}
              </Form>
            </>
          )}
        </Formik>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export const mapStateToProps: (state: ReduxState) => AnalyticsPageMappedProps = state => ({
  appInstallations: state.installations,
  appsOfDeveloper: state.developer,
  appDetail: state.appDetail
})

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestAppDetailData: data => dispatch(appDetailRequestData(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage))
