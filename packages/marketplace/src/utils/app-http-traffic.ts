import { HttpTrafficPerdayStatsModel } from '@reapit/foundations-ts-definitions'
import orderBy from 'lodash.orderby'
import { toLocalTime } from '@reapit/elements'

export interface ChartDataModel {
  date: string
  requestCount: number
}

export const getAppHttpTrafficPerDayChartData = stats => {
  const chartDataStats = [...stats]

  const labels: string[] = []
  const data: number[] = []
  chartDataStats.map(item => {
    labels.push(item.date)
    data.push(item.requestCount)
  })

  return {
    labels,
    data,
    chartDataStats,
  }
}

export const getChartOptions = data => {
  return {
    legend: null,
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function(tooltipItem) {
          return data.find(x => x.label === tooltipItem.label).data
        },
      },
    },
  }
}

export const getChartConfig = (labels: string[], data: number[]) => {
  return {
    labels,
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data,
      },
    ],
  }
}
