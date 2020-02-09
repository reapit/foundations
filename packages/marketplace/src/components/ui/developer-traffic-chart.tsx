import * as React from 'react'
import { H4 } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { UsageStatsModel, PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { getAppUsageStatsChartData, getChartConfig, getChartOptions } from '@/utils/app-usage-stats.ts'

export type DeveloperTrafficChartProps = {
  stats: UsageStatsModel
  apps: PagedResultAppSummaryModel_
}

export const DeveloperTrafficChart: React.FC<DeveloperTrafficChartProps> = ({ stats, apps }) => {
  console.log('TCL: apps', apps)
  const { appUsage } = stats || {}
  const { labels, data, appUsageStatsGroupedByDate } = getAppUsageStatsChartData(appUsage)
  const chartData = getChartConfig(labels, data)
  const chartOptions = getChartOptions(appUsageStatsGroupedByDate)

  return (
    <div>
      <H4>Traffic (API Count)</H4>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default DeveloperTrafficChart
