import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { FlexContainerBasic, Grid, GridItem, FlexContainerResponsive } from '@reapit/elements'
import orderBy from 'lodash.orderby'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AppUsageStatsState } from '@/reducers/app-usage-stats'
import { appUsageStatsRequestData, AppUsageStatsParams } from '@/actions/app-usage-stats'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { DeveloperState } from '@/reducers/developer'
import { AppInstallationsState } from '@/reducers/app-installations'

import styles from '@/styles/pages/analytics.scss?mod'
import DeveloperInstallationsChart from '@/components/ui/developer-installations-chart'
import DeveloperTrafficChart from '@/components/ui/developer-traffic-chart'
import DeveloperTrafficTable from '@/components/ui/developer-traffic-table'
import InstallationTable, { InstallationModelWithAppName } from './installation-table'

export interface DetailedTabMappedProps {
  developer?: DeveloperState
  installations?: AppInstallationsState
  appUsageStats?: AppUsageStatsState
}

export interface DetailedTabMappedActions {
  loadStats?: (params: AppUsageStatsParams) => void
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

export const DetailedTab: React.FC<DetailedTabProps> = ({ installations, developer, appUsageStats, loadStats }) => {
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

  React.useEffect(handleFetchAppUsageStatsDataUseEffect(fetchAppUsageStatsData), [fetchAppUsageStatsData])

  const appUsageStatsLoading = appUsageStats?.loading
  const appUsageStatsData = appUsageStats?.appUsageStatsData || {}
  const developerAppsData = developer?.developerData?.data || {}
  const installationsAppLoading = installations?.loading

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
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
})

export const mapDispatchToProps = (dispatch: Dispatch): DetailedTabMappedActions => ({
  loadStats: (params: AppUsageStatsParams) => dispatch(appUsageStatsRequestData(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailedTab)
