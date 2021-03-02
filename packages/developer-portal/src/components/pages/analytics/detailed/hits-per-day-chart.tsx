import * as React from 'react'
import { H5, Loader, Section } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { RequestByDateModel } from '@/reducers/traffic-statistics/list'
import { getAppHttpTrafficPerDayChartData, getChartConfig, getChartOptions } from '@/utils/app-http-traffic.ts'
import FadeIn from '../../../../styles/fade-in'

export type DeveloperHitsPerDayProps = {
  stats: RequestByDateModel[]
  loading?: Boolean | false
}

export const renderChart = (appHttpTrafficPerDayChartData) => {
  const { labels, data, chartDataStats } = appHttpTrafficPerDayChartData
  const chartData = getChartConfig(labels, data)
  const chartOptions = getChartOptions(chartDataStats)
  return (
    <Section hasMargin={false}>
      <H5>Hits Per Day</H5>
      <FadeIn>
        <Line data={chartData} options={chartOptions} />
      </FadeIn>
    </Section>
  )
}

export const DeveloperHitsPerDay: React.FC<DeveloperHitsPerDayProps> = ({ stats, loading }) => {
  const appHttpTrafficPerDayChartData = getAppHttpTrafficPerDayChartData(stats)

  return loading ? <Loader /> : renderChart(appHttpTrafficPerDayChartData)
}

export default DeveloperHitsPerDay
