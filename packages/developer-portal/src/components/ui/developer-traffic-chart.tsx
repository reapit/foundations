import * as React from 'react'
import { H4, Loader } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { getAppUsageStatsChartData, getChartConfig, getChartOptions } from '@/utils/app-usage-stats.ts'

export type DeveloperTrafficChartProps = {
  // UsageStatsModel is deprecated
  stats: any
  apps: PagedResultAppSummaryModel_
  loading?: Boolean | false
}

// TODO: unused component, should be removed
export const DeveloperTrafficChart: React.FC<DeveloperTrafficChartProps> = ({ stats, apps, loading }) => {
  const { appUsage } = stats || {}
  const appUsageStatsChartData = getAppUsageStatsChartData(appUsage, apps.data)

  function renderChart() {
    const { labels, data, appUsageStatsGroupedByDate } = appUsageStatsChartData
    const chartData = getChartConfig(labels, data)
    const chartOptions = getChartOptions(appUsageStatsGroupedByDate)
    return (
      <>
        <H4>Traffic (API Count)</H4>
        <Line data={chartData} options={chartOptions} />
      </>
    )
  }

  return <div>{loading ? <Loader /> : renderChart()}</div>
}

export default DeveloperTrafficChart
