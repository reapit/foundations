import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Table,
  FlexContainerBasic,
  H4,
  Loader,
  toLocalTime,
  Pagination,
  Grid,
  GridItem,
  FlexContainerResponsive,
} from '@reapit/elements'
import orderBy from 'lodash.orderby'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppUsageStatsState } from '@/reducers/app-usage-stats'
import { AppHttpTrafficEventState } from '@/reducers/app-http-traffic-event'
import { appUsageStatsRequestData, AppUsageStatsParams } from '@/actions/app-usage-stats'
import { httpTrafficPerDayRequestData, HttpTrafficPerDayParams } from '@/actions/app-http-traffic-event'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { DeveloperState } from '@/reducers/developer'
import { AppInstallationsState } from '@/reducers/app-installations'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import styles from '@/styles/pages/analytics.scss?mod'
import DeveloperInstallationsChart from '@/components/ui/developer-installations-chart'
import DeveloperTrafficChart from '@/components/ui/developer-traffic-chart'
import DeveloperTrafficTable from '@/components/ui/developer-traffic-table'
import DeveloperHitsPerDayChart from '@/components/ui/developer-hits-per-day-chart'

export const installationTableColumn = [
  { Header: 'App Name', accessor: 'appName' },
  {
    Header: 'Client',
    accessor: 'client',
  },
  {
    Header: 'Date of installation',
    accessor: row => toLocalTime(row.created),
  },
  {
    Header: 'Date of Uninstallation',
    accessor: row => {
      return row.terminatesOn ? toLocalTime(row.terminatesOn) : ''
    },
  },
]

export interface DetailedTabMappedProps {
  developer?: DeveloperState
  installations?: AppInstallationsState
  appUsageStats?: AppUsageStatsState
  appHttpTraffic?: AppHttpTrafficEventState
}

export interface DetailedTabMappedActions {
  loadStats?: (params: AppUsageStatsParams) => void
  loadHttpTrafficPerDay?: (params: HttpTrafficPerDayParams) => void
}

export interface InstallationModelWithAppName extends InstallationModel {
  appName?: string
}

export type DetailedTabProps = DetailedTabMappedProps & DetailedTabMappedActions

export const handleMapAppNameToInstallation = (
  installationsAppDataArray: InstallationModel[] = [],
  developerDataArray: AppSummaryModel[] = [],
) => (): InstallationModelWithAppName[] => {
  return installationsAppDataArray.map(installation => {
    const app = developerDataArray.find(app => app.id === installation.appId)
    return {
      ...installation,
      appName: app?.name,
    }
  })
}

export const sortAppByDateInstalled = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
): InstallationModelWithAppName[] => {
  const newAppData = [...installationsAppDataArrayWithName].sort(
    (a: InstallationModelWithAppName, b: InstallationModelWithAppName) => {
      if (!a.created || !b.created) {
        return 0
      }
      const dateA = new Date(a.created).getTime()
      const dateB = new Date(b.created).getTime()
      return dateA < dateB ? 1 : -1
    },
  )
  return newAppData
}

export const handleUseMemoData = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
  pageNumber: number,
) => (): InstallationModelWithAppName[] => {
  const sortedInstallationsAppDataArray = sortAppByDateInstalled(installationsAppDataArrayWithName)
  const slicedInstallationAppDataArray = sortedInstallationsAppDataArray.slice(
    (pageNumber - 1) * INSTALLATIONS_PER_PAGE,
    pageNumber * INSTALLATIONS_PER_PAGE,
  )
  return slicedInstallationAppDataArray
}

/**
 * Count installations for each app has installation
 * E.g. return {appName1: 1, appName2: 0, appName3: 15}
 */
export const countAppHasInstallation = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
): { [appName: string]: number } =>
  installationsAppDataArrayWithName.reduce((prevValue, { appName, terminatesOn }) => {
    if (!appName || terminatesOn) {
      return prevValue
    }
    const newValue = { ...prevValue }
    if (prevValue[appName]) {
      newValue[appName]++
      return newValue
    }
    newValue[appName] = 1
    return newValue
  }, {}) as { [appName: string]: number }

/**
 * All app in here will show 0 because it's not installed
 */
export const countAppNoInstallation = (developerDataArray: AppSummaryModel[]): { [appName: string]: number } =>
  developerDataArray.reduce((prevValue, { name }) => {
    if (!name) {
      return prevValue
    }
    const newValue = { ...prevValue }
    newValue[name] = 0
    return newValue
  }, {}) as { [appName: string]: number }

export const handleCountCurrentInstallationForEachApp = (
  installationAppDataArrayWithName: InstallationModelWithAppName[],
  developerDataArray: AppSummaryModel[],
) => (): { [appName: string]: number } => {
  const appHasInstallation = countAppHasInstallation(installationAppDataArrayWithName)
  const appNoInstallation = countAppNoInstallation(developerDataArray)
  return {
    ...appNoInstallation,
    ...appHasInstallation,
  }
}

export const handleSetPageNumber = setPageNumber => (pageNumber: number) => setPageNumber(pageNumber)

export const InstallationTable: React.FC<{
  installedApps: InstallationModelWithAppName[]
  installations?: AppInstallationsState
  developer?: DeveloperState
  loading?: boolean
}> = ({ installedApps, installations, developer, loading }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const developerDataArray = developer?.developerData?.data?.data ?? []

  const appCountEntries = React.useMemo(handleCountCurrentInstallationForEachApp(installedApps, developerDataArray), [
    installedApps,
    developerDataArray,
  ])
  const memoizedData = React.useMemo(handleUseMemoData(installedApps, pageNumber), [installedApps, pageNumber])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <H4>Installations</H4>
          <p className="is-italic">
            The installations table below shows the individual installations per client with a total number of
            installations per app
          </p>
          <div className={styles.totalCount}>
            {Object.entries(appCountEntries).map(([appName, count]) => (
              <p key={appName}>
                Total current installations for <strong>{appName}</strong>: {count}
              </p>
            ))}
          </div>
          <Table bordered scrollable columns={installationTableColumn} data={memoizedData} loading={false} />
          <br />
          <Pagination
            pageNumber={pageNumber}
            onChange={handleSetPageNumber(setPageNumber)}
            pageSize={INSTALLATIONS_PER_PAGE}
            totalCount={installations?.installationsAppData?.totalCount ?? 0}
          />
        </>
      )}
    </div>
  )
}

export const handleFetchAppUsageStatsDataUseCallback = (
  developerAppDataArray: AppSummaryModel[] = [],
  loadStats?: (params: AppUsageStatsParams) => void,
) => {
  return () => {
    if (loadStats) {
      const orderredDeveloperAppDataArray = orderBy(developerAppDataArray, ['created'], ['asc'])
      const firstCreatedApp = orderredDeveloperAppDataArray[0]
      const appIds = orderredDeveloperAppDataArray.map((app: AppSummaryModel) => {
        return app.id
      })
      loadStats({
        appId: appIds,
        dateFrom: firstCreatedApp?.created,
      })
    }
  }
}

export const handleFetchAppUsageStatsDataUseEffect = (fetchAppUsageStatsData: () => void) => {
  return () => {
    fetchAppUsageStatsData()
  }
}

export const handleFetchHttpTrafficPerDayDataUseCallback = (
  loadHttpTrafficPerDay?: (params: HttpTrafficPerDayParams) => void,
) => {
  return () => {
    if (loadHttpTrafficPerDay) {
      loadHttpTrafficPerDay({
        applicationId: ['4fbbb1e8-bad0-43a2-98f9-bfb9bba366e7'],
        dateFrom: '2020-02-17',
        dateTo: '2020-04-05',
      })
    }
  }
}

export const handleFetchHttpTrafficPerDayDataUseEffect = (fetchHttpTrafficPerDayData: () => void) => {
  return () => {
    fetchHttpTrafficPerDayData()
  }
}

export const DetailedTab: React.FC<DetailedTabProps> = ({
  installations,
  developer,
  appUsageStats,
  loadStats,
  loadHttpTrafficPerDay,
  appHttpTraffic,
}) => {
  const installationAppDataArray = installations?.installationsAppData?.data
  const developerDataArray = developer?.developerData?.data?.data

  const installationAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationAppDataArray, developerDataArray),
    [installationAppDataArray, developerDataArray],
  )

  const fetchAppUsageStatsData = React.useCallback(
    handleFetchAppUsageStatsDataUseCallback(developerDataArray, loadStats),
    [developerDataArray, loadStats],
  )

  const fetchHttpTrafficPerDayData = React.useCallback(
    handleFetchHttpTrafficPerDayDataUseCallback(loadHttpTrafficPerDay),
    [developerDataArray, loadHttpTrafficPerDay],
  )

  React.useEffect(handleFetchAppUsageStatsDataUseEffect(fetchAppUsageStatsData), [fetchAppUsageStatsData])

  React.useEffect(handleFetchHttpTrafficPerDayDataUseEffect(fetchHttpTrafficPerDayData), [fetchHttpTrafficPerDayData])

  const appUsageStatsLoading = appUsageStats?.loading
  const appUsageStatsData = appUsageStats?.appUsageStatsData || {}
  const developerAppsData = developer?.developerData?.data || {}
  const installationsAppLoading = installations?.loading

  const appHttpTrafficPerDayLoading = appHttpTraffic?.perDayLoading
  const apphttpTrafficPerDayData = appHttpTraffic?.trafficEvents?.requestsByDate || []

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <Grid isMultiLine>
            <GridItem>
              <DeveloperHitsPerDayChart stats={apphttpTrafficPerDayData} loading={appHttpTrafficPerDayLoading} />
            </GridItem>
            <GridItem>
              {/* Chart showing Hits By Endpoint here */}
              <p>Hits per endpoint</p>
            </GridItem>
          </Grid>
          <Grid isMultiLine>
            <GridItem>
              <DeveloperTrafficChart
                stats={appUsageStatsData}
                apps={developerAppsData}
                loading={appUsageStatsLoading}
              />
            </GridItem>
            <GridItem>
              <DeveloperTrafficTable
                stats={appUsageStatsData}
                apps={developerAppsData}
                loading={appUsageStatsLoading}
              />
            </GridItem>
          </Grid>
          <InstallationTable
            installedApps={installationAppDataArrayWithName}
            installations={installations}
            developer={developer}
            loading={installationsAppLoading}
          />
          <Grid>
            <GridItem className="is-half">
              <DeveloperInstallationsChart data={installationAppDataArrayWithName} loading={installationsAppLoading} />
            </GridItem>
          </Grid>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export const mapStateToProps: (state: ReduxState) => DetailedTabMappedProps = state => ({
  installations: state.installations,
  developer: state.developer,
  appUsageStats: state.appUsageStats,
  appHttpTraffic: state.appHttpTraffic,
})

export const mapDispatchToProps = (dispatch: Dispatch): DetailedTabMappedActions => ({
  loadStats: (params: AppUsageStatsParams) => dispatch(appUsageStatsRequestData(params)),
  loadHttpTrafficPerDay: (params: HttpTrafficPerDayParams) => dispatch(httpTrafficPerDayRequestData(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailedTab)
