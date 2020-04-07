import * as React from 'react'
import { H4, Loader } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { RequestByDateModel } from '@/reducers/app-http-traffic-event'
import { getAppHttpTrafficPerDayChartData, getChartConfig, getChartOptions } from '@/utils/app-http-traffic.ts'

export type DeveloperHitsPerDayProps = {
  stats: RequestByDateModel[]
  loading?: Boolean | false
}

export const renderChart = appHttpTrafficPerDayChartData => {
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

export const DeveloperHitsPerDay: React.FC<DeveloperHitsPerDayProps> = ({ stats, loading }) => {
  const appHttpTrafficPerDayChartData = getAppHttpTrafficPerDayChartData(stats)

  return <div>{loading ? <Loader /> : renderChart(appHttpTrafficPerDayChartData)}</div>
}

export default DeveloperHitsPerDay
