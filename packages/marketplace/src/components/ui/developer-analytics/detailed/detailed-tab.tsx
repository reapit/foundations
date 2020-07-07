import * as React from 'react'
import orderBy from 'lodash.orderby'
import dayjs from 'dayjs'

import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppHttpTrafficEventState } from '@/reducers/app-http-traffic-event'
import { httpTrafficPerDayRequestData } from '@/actions/app-http-traffic-event'
import { appInstallationsRequestData, appInstallationsFilterRequestData } from '@/actions/app-installations'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { getAppUsageStats, getAppHttpTraffic } from '@/selector/analytics'
import { selectDeveloper } from '@/selector/developer'
import { getInstallations } from '@/selector/installations'

import { Grid, GridItem, DATE_TIME_FORMAT, Section } from '@reapit/elements'
import DeveloperHitsPerDayChart from '@/components/ui/developer-hits-per-day-chart'
import InstallationAppSection, { InstallationModelWithAppName } from './installation-app-section'
import FilterBar from './filter-bar'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { AppInstallationsState } from '@/reducers/app-installations'
import { DeveloperState } from '@/reducers/developer'
import { AppUsageStatsState } from '@/reducers/app-usage-stats'
import TrafficEventTable from './traffic-event-table'
import { prepareDefaultFilterDateParams } from './filter-bar/default-filter-group'

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

export const handleDefaultFilter = (developerAppDataArray: AppSummaryModel[]) => {
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

  return {
    lastMonday,
    lastSunday,
    appIds,
  }
}

export const handleFetchAppUsageStatsDataUseCallback = dispatch => {
  return () => {
    const { defaultParams } = prepareDefaultFilterDateParams()

    dispatch(
      appInstallationsFilterRequestData({
        installedDateFrom: defaultParams.dateFrom,
        installedDateTo: defaultParams.dateTo,
        pageSize: GET_ALL_PAGE_SIZE,
      }),
    )
    dispatch(
      appInstallationsRequestData({
        pageSize: GET_ALL_PAGE_SIZE,
      }),
    )
  }
}

export const handleFetchAppUsageStatsDataUseEffect = (fetchAppUsageStatsData: () => void) => {
  return () => {
    fetchAppUsageStatsData()
  }
}

export const handleFetchHttpTrafficPerDayDataUseCallback = (
  developerAppDataArray: AppSummaryModel[] = [],
  dispatch,
) => () => {
  const { appIds } = handleDefaultFilter(developerAppDataArray)
  const { defaultParams } = prepareDefaultFilterDateParams()

  if (appIds.length) {
    dispatch(
      httpTrafficPerDayRequestData({
        applicationId: appIds,
        dateFrom: defaultParams.dateFrom,
        dateTo: defaultParams.dateTo,
      }),
    )
  }
}

export const handleFetchHttpTrafficPerDayDataUseEffect = (fetchHttpTrafficPerDayData: () => void) => {
  return () => {
    fetchHttpTrafficPerDayData()
  }
}

export type MapState = {
  installations: AppInstallationsState
  developer: DeveloperState
  appUsageStats: AppUsageStatsState
  appHttpTraffic: AppHttpTrafficEventState
}

export const mapState = (state: ReduxState): MapState => {
  return {
    installations: getInstallations(state),
    developer: selectDeveloper(state),
    appUsageStats: getAppUsageStats(state),
    appHttpTraffic: getAppHttpTraffic(state),
  }
}

export const DetailedTab: React.FC<DetailedTabProps> = () => {
  const dispatch = useDispatch()
  const { developer, installations, appHttpTraffic } = useSelector(mapState)
  const installationAppDataArray = installations?.installationsAppData?.data
  const installationFilterAppDataArray = installations?.installationsFilteredAppData?.data
  const developerDataArray = developer?.developerData?.data?.data

  const installationAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationAppDataArray, developerDataArray),
    [installationAppDataArray, developerDataArray],
  )
  const installationFilterAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationFilterAppDataArray, developerDataArray),
    [installationFilterAppDataArray, developerDataArray],
  )

  const fetchAppUsageStatsData = React.useCallback(handleFetchAppUsageStatsDataUseCallback(dispatch), [
    developerDataArray,
  ])

  const fetchHttpTrafficPerDayData = React.useCallback(
    handleFetchHttpTrafficPerDayDataUseCallback(developerDataArray, dispatch),
    [developerDataArray],
  )

  React.useEffect(handleFetchAppUsageStatsDataUseEffect(fetchAppUsageStatsData), [fetchAppUsageStatsData])

  React.useEffect(handleFetchHttpTrafficPerDayDataUseEffect(fetchHttpTrafficPerDayData), [fetchHttpTrafficPerDayData])

  const developerAppsData = developer?.developerData?.data || {}
  const installationsAppLoading = installations?.loading

  const appHttpTrafficPerDayLoading = appHttpTraffic?.perDayLoading
  const appHttpTrafficPerDayData = appHttpTraffic?.trafficEvents?.requestsByDate || []
  const trafficEvents = appHttpTraffic?.trafficEvents

  return (
    <ErrorBoundary>
      <Section>
        <FilterBar developerAppsData={developerAppsData} installationAppDataArray={installationAppDataArray || []} />
      </Section>
      <Grid isMultiLine>
        <GridItem className="is-half">
          <DeveloperHitsPerDayChart stats={appHttpTrafficPerDayData} loading={appHttpTrafficPerDayLoading} />
        </GridItem>
        <GridItem className="is-half">
          <TrafficEventTable trafficEvents={trafficEvents} loading={appHttpTrafficPerDayLoading} />
        </GridItem>
      </Grid>
      <InstallationAppSection
        installedApps={installationAppDataArrayWithName}
        filteredInstalledApps={installationFilterAppDataArrayWithName}
        installations={installations}
        developer={developer}
        loading={installationsAppLoading}
      />
    </ErrorBoundary>
  )
}

export default DetailedTab
