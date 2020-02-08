import * as React from 'react'
import { H4, Loader } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { UsageStatsModel } from '@reapit/foundations-ts-definitions'
import { AppUsageStatsParams, appUsageStatsRequestData } from '@/actions/app-usage-stats'
import { getAppUsageStatsChartData, getChartConfig, getChartOptions } from '@/utils/app-usage-stats.ts'

export interface AppUsageStatsMappedProps {
  appUsageStatsData: UsageStatsModel | null
  loading: boolean
}

export interface AppUsageStatsMappedActions {
  fetchAppUsageStats: (params: AppUsageStatsParams) => () => void
}

export const mapStateToProps = (state: ReduxState): AppUsageStatsMappedProps => {
  const {
    appUsageStats: { appUsageStatsData, loading },
  } = state
  return {
    appUsageStatsData,
    loading,
  }
}

export const mapDispatchToProps = (dispatch: any): AppUsageStatsMappedActions => ({
  fetchAppUsageStats: (params: AppUsageStatsParams) => () => {
    dispatch(appUsageStatsRequestData(params))
  },
})

export type AppUsageStatsProps = AppUsageStatsMappedProps & AppUsageStatsMappedActions

export const AppUsageStats: React.FC<AppUsageStatsProps> = ({ fetchAppUsageStats, appUsageStatsData, loading }) => {
  React.useEffect(fetchAppUsageStats({}), [])
  const { appUsage } = appUsageStatsData || {}
  const { labels, data, appUsageStatsGroupedByDate } = getAppUsageStatsChartData(appUsage)
  const chartData = getChartConfig(labels, data)
  const chartOptions = getChartOptions(appUsageStatsGroupedByDate)

  return (
    <>
      <H4>Traffic (API Count)</H4>
      {loading ? <Loader /> : <Line data={chartData} options={chartOptions} />}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppUsageStats)
