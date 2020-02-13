import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Table,
  FlexContainerBasic,
  H3,
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
import { appUsageStatsRequestData, AppUsageStatsParams } from '@/actions/app-usage-stats'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { DeveloperState } from '@/reducers/developer'
import { AppInstallationsState } from '@/reducers/app-installations'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import { withRouter } from 'react-router'
import styles from '@/styles/pages/analytics.scss?mod'
import DeveloperInstallationsChart from '@/components/ui/developer-installations-chart'
import DeveloperTrafficChart from '@/components/ui/developer-traffic-chart'
import DeveloperTrafficTable from '../ui/developer-traffic-table'

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

export interface AnalyticsPageMappedProps {
  developer: DeveloperState
  installations: AppInstallationsState
  appUsageStats: AppUsageStatsState
}

export interface AnalyticsPageMappedActions {
  loadStats: (params: AppUsageStatsParams) => void
}

export interface InstallationModelWithAppName extends InstallationModel {
  appName?: string
}

export type AnalyticsPageProps = AnalyticsPageMappedProps & AnalyticsPageMappedActions

export const handleMapAppNameToInstallation = (
  installationsAppDataArray: InstallationModel[],
  developerDataArray: AppSummaryModel[],
) => (): InstallationModelWithAppName[] =>
  installationsAppDataArray.map(installation => {
    const app = developerDataArray.find(app => app.id === installation.appId)
    return {
      ...installation,
      appName: app?.name,
    }
  })

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
  installations: AppInstallationsState
  developer: DeveloperState
  loading?: boolean
}> = ({ installedApps, installations, developer, loading }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const developerDataArray = developer.developerData?.data?.data ?? []

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
            totalCount={installations.installationsAppData?.totalCount ?? 0}
          />
        </>
      )}
    </div>
  )
}

export const handleFetchAppUsageStatsDataUseCallback = (
  installationAppDataArray: InstallationModel[],
  loadStats: (params: AppUsageStatsParams) => void,
) => {
  return () => {
    const orderedInstallationsByDate: InstallationModel[] = orderBy(installationAppDataArray, ['created'], ['asc'])
    const firstInstallationDate = orderedInstallationsByDate[0]
    if (firstInstallationDate) {
      loadStats({
        dateFrom: firstInstallationDate.created,
      })
    }
  }
}

export const handleFetchAppUsageStatsDataUseEffect = (fetchAppUsageStatsData: () => void) => {
  return () => {
    fetchAppUsageStatsData()
  }
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ installations, developer, appUsageStats, loadStats }) => {
  const installationAppDataArray = installations.installationsAppData?.data ?? []
  const developerDataArray = developer.developerData?.data?.data ?? []

  const installationAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationAppDataArray, developerDataArray),
    [installationAppDataArray, developerDataArray],
  )

  const fetchAppUsageStatsData = React.useCallback(
    handleFetchAppUsageStatsDataUseCallback(installationAppDataArray, loadStats),
    [installationAppDataArray, loadStats],
  )

  React.useEffect(handleFetchAppUsageStatsDataUseEffect(fetchAppUsageStatsData), [fetchAppUsageStatsData])

  const appUsageStatsLoading = appUsageStats.loading
  const appUsageStatsData = appUsageStats.appUsageStatsData || {}
  const developerAppsData = developer?.developerData?.data || {}
  const installationsAppLoading = installations.loading

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <H3>Dashboard</H3>
          <hr className={styles.hr} />
          <Grid isMultiLine>
            <GridItem>
              <DeveloperInstallationsChart data={installationAppDataArrayWithName} loading={installationsAppLoading} />
            </GridItem>
            <GridItem>
              <DeveloperTrafficChart
                stats={appUsageStatsData}
                apps={developerAppsData}
                loading={appUsageStatsLoading}
              />
            </GridItem>
          </Grid>
          <DeveloperTrafficTable stats={appUsageStatsData} apps={developerAppsData} loading={appUsageStatsLoading} />
          <InstallationTable
            installedApps={installationAppDataArrayWithName}
            installations={installations}
            developer={developer}
            loading={installationsAppLoading}
          />
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export const mapStateToProps: (state: ReduxState) => AnalyticsPageMappedProps = state => ({
  installations: state.installations,
  developer: state.developer,
  appUsageStats: state.appUsageStats,
})

export const mapDispatchToProps = (dispatch: Dispatch): AnalyticsPageMappedActions => ({
  loadStats: (params: AppUsageStatsParams) => dispatch(appUsageStatsRequestData(params)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnalyticsPage))
