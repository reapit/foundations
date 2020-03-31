import * as React from 'react'
import orderBy from 'lodash.orderby'
import dayjs from 'dayjs'

import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from '@/types/core'

import { appUsageStatsRequestData, AppUsageStatsParams } from '@/actions/app-usage-stats'
import { appInstallationsRequestData, InstallationParams } from '@/actions/app-installations'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { getAppUsageStats } from '@/selector/analytics'
import { getDevelopers } from '@/selector/developer'
import { getInstallations } from '@/selector/installations'

import { FlexContainerBasic, Grid, GridItem, FlexContainerResponsive, DATE_TIME_FORMAT } from '@reapit/elements'
import DeveloperInstallationsChart from '@/components/ui/developer-installations-chart'
import DeveloperTrafficChart from '@/components/ui/developer-traffic-chart'
import DeveloperTrafficTable from '@/components/ui/developer-traffic-table'
import InstallationTable, { InstallationModelWithAppName } from './installation-table'
import FilterBar from './filter-bar'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import styles from '@/styles/pages/analytics.scss?mod'
import { AppInstallationsState } from '@/reducers/app-installations'
import { DeveloperState } from '@/reducers/developer'
import { AppUsageStatsState } from '@/reducers/app-usage-stats'

export type DetailedTabProps = {}

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

export const handleFetchAppUsageStatsDataUseCallback = (
  developerAppDataArray: AppSummaryModel[] = [],
  loadAppUsageStats: (params: AppUsageStatsParams) => void,
  loadInstallations: (params: InstallationParams) => void,
) => {
  return () => {
    const orderredDeveloperAppDataArray = orderBy(developerAppDataArray, ['created'], ['asc'])
    const appIds = orderredDeveloperAppDataArray.map((app: AppSummaryModel) => {
      return app.id
    })
    const lastWeek = dayjs().subtract(1, 'week')
    const lastMonday = lastWeek
      .startOf('week')
      .add(1, 'day')
      .format(DATE_TIME_FORMAT.YYYY_MM_DD)
    const lastSunday = lastWeek
      .endOf('week')
      .add(1, 'day')
      .format(DATE_TIME_FORMAT.YYYY_MM_DD)

    loadAppUsageStats({
      appId: appIds,
      dateFrom: lastMonday,
      dateTo: lastSunday,
    })

    loadInstallations({
      installedDateFrom: lastMonday,
      installedDateTo: lastSunday,
      pageSize: GET_ALL_PAGE_SIZE,
    })
  }
}

export const handleFetchAppUsageStatsDataUseEffect = (fetchAppUsageStatsData: () => void) => {
  return () => {
    fetchAppUsageStatsData()
  }
}

export type MapState = {
  installations: AppInstallationsState
  developer: DeveloperState
  appUsageStats: AppUsageStatsState
}

export const mapState = (state: ReduxState): MapState => {
  return {
    installations: getInstallations(state),
    developer: getDevelopers(state),
    appUsageStats: getAppUsageStats(state),
  }
}

export const handleLoadAppUsageStatsUseCallback = (dispatch: Dispatch) => {
  return (params: AppUsageStatsParams) => {
    dispatch(appUsageStatsRequestData(params))
  }
}

export const handleLoadInstallationsUseCallback = (dispatch: Dispatch) => {
  return (params: InstallationParams) => {
    dispatch(appInstallationsRequestData(params))
  }
}

export const DetailedTab: React.FC<DetailedTabProps> = () => {
  const dispatch = useDispatch()
  const { appUsageStats, developer, installations } = useSelector(mapState)
  const installationAppDataArray = installations?.installationsAppData?.data
  const developerDataArray = developer?.developerData?.data?.data
  const installationAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationAppDataArray, developerDataArray),
    [installationAppDataArray, developerDataArray],
  )

  const loadAppUsageStats = React.useCallback(handleLoadAppUsageStatsUseCallback(dispatch), [])
  const loadInstallations = React.useCallback(handleLoadInstallationsUseCallback(dispatch), [])
  const fetchAppUsageStatsData = React.useCallback(
    handleFetchAppUsageStatsDataUseCallback(developerDataArray, loadAppUsageStats, loadInstallations),
    [developerDataArray],
  )

  React.useEffect(handleFetchAppUsageStatsDataUseEffect(fetchAppUsageStatsData), [fetchAppUsageStatsData])

  const appUsageStatsLoading = appUsageStats?.loading
  const appUsageStatsData = appUsageStats?.appUsageStatsData || {}
  const developerAppsData = developer?.developerData?.data || {}
  const installationsAppLoading = installations?.loading

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <FilterBar developerAppsData={developerAppsData} installationAppDataArray={installationAppDataArray || []} />
          <Grid isMultiLine className="mt-5">
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

export default DetailedTab
