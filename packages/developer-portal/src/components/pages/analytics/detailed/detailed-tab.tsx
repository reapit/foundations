import * as React from 'react'
import orderBy from 'lodash.orderby'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrafficStatistics } from '@/actions/traffic-statistics'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { getAppHttpTraffic } from '@/selector/analytics'
import { selectInstallationsListData, selectInstallationsFilterListData } from '@/selector/installations'

import { Grid, GridItem } from '@reapit/elements'
import DeveloperHitsPerDayChart from './hits-per-day-chart'
import InstallationAppSection, { InstallationModelWithAppName } from './installation-app-section'
import FilterBar from './filter-bar'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import TrafficEventTable from './traffic-event-table'
import { prepareDefaultFilterDateParams } from './filter-bar/default-filter-group'
import { selectAppListState } from '@/selector/apps/app-list'
import { fetchInstallationsList, fetchInstallationsFilterList } from '@/actions/installations'

export type DetailedTabProps = {}

export const handleMapAppNameToInstallation = (
  installationsAppDataArray: InstallationModel[] = [],
  developerDataArray: AppSummaryModel[] = [],
) => (): InstallationModelWithAppName[] => {
  return installationsAppDataArray.map((installation) => {
    const app = developerDataArray.find((app) => app.id === installation.appId)
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

  return {
    appIds,
  }
}

export const handleFetchAppUsageStatsDataUseCallback = (dispatch) => {
  return () => {
    const { defaultParams } = prepareDefaultFilterDateParams()

    dispatch(
      fetchInstallationsFilterList({
        installedDateFrom: defaultParams.dateFrom,
        installedDateTo: defaultParams.dateTo,
        pageSize: GET_ALL_PAGE_SIZE,
      }),
    )
    dispatch(
      fetchInstallationsList({
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
      fetchTrafficStatistics({
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

export const DetailedTab: React.FC<DetailedTabProps> = () => {
  const dispatch = useDispatch()

  const appHttpTraffic = useSelector(getAppHttpTraffic)
  const { data: apps = [] } = useSelector(selectAppListState)
  const installationAppDataArray = useSelector(selectInstallationsListData)
  const installationFilterAppDataArray = useSelector(selectInstallationsFilterListData)

  const installationAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationAppDataArray, apps),
    [installationAppDataArray, apps],
  )
  const installationFilterAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationFilterAppDataArray, apps),
    [installationFilterAppDataArray, apps],
  )

  const fetchAppUsageStatsData = React.useCallback(handleFetchAppUsageStatsDataUseCallback(dispatch), [apps])

  const fetchHttpTrafficPerDayData = React.useCallback(handleFetchHttpTrafficPerDayDataUseCallback(apps, dispatch), [
    apps,
  ])

  React.useEffect(handleFetchAppUsageStatsDataUseEffect(fetchAppUsageStatsData), [fetchAppUsageStatsData])

  React.useEffect(handleFetchHttpTrafficPerDayDataUseEffect(fetchHttpTrafficPerDayData), [fetchHttpTrafficPerDayData])

  const trafficEvents = appHttpTraffic?.list?.data
  const appHttpTrafficPerDayLoading = appHttpTraffic?.list.isLoading
  const appHttpTrafficPerDayData = appHttpTraffic?.list.data?.requestsByDate || []

  return (
    <ErrorBoundary>
      <FilterBar developerAppsData={apps} installationAppDataArray={installationAppDataArray || []} />
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
        apps={apps}
      />
    </ErrorBoundary>
  )
}

export default DetailedTab
