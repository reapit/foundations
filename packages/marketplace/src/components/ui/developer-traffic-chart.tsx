import * as React from 'react'
import { H4, Alert, Loader } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { UsageStatsModel, PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { getAppUsageStatsChartData, getChartConfig, getChartOptions } from '@/utils/app-usage-stats.ts'

export type DeveloperTrafficChartProps = {
  stats: UsageStatsModel
  apps: PagedResultAppSummaryModel_
  loading?: Boolean | false
}

export const DeveloperTrafficChart: React.FC<DeveloperTrafficChartProps> = ({ stats, apps, loading }) => {
  const { appUsage } = stats || {}
  const appUsageStatsChartData = getAppUsageStatsChartData(appUsage, apps.data)

  function renderChart() {
    if (!appUsageStatsChartData) {
      return <Alert message="You currently have no apps usage stats " type="info" />
    }

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
