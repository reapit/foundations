import * as React from 'react'
import { H4, Loader } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { HttpTrafficPerdayStatsModel } from '@reapit/foundations-ts-definitions'
import { getAppHttpTrafficPerDayChartData, getChartConfig, getChartOptions } from '@/utils/app-http-traffic.ts'

export type DeveloperHitsPerDayProps = {
  stats: HttpTrafficPerdayStatsModel[]
  loading?: Boolean | false
}

export const DeveloperHitsPerDay: React.FC<DeveloperHitsPerDayProps> = ({ stats, loading }) => {
  const appHttpTrafficPerDayChartData = getAppHttpTrafficPerDayChartData(stats)

  function renderChart() {
    const { labels, data, chartDataStats } = appHttpTrafficPerDayChartData
    const chartData = getChartConfig(labels, data)
    const chartOptions = getChartOptions(chartDataStats)
    return (
      <>
        <H4>Hits Per Day</H4>
        <Line data={chartData} options={chartOptions} />
      </>
    )
  }

  return <div>{loading ? <Loader /> : renderChart()}</div>
}

export default DeveloperHitsPerDay
