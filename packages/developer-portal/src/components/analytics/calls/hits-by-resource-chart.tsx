import 'chart.js/auto'
import { TrafficEventsModel } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'

export interface HitsByResourceChartProps {
  trafficEvents: TrafficEventsModel
}

export interface ChartDataModel {
  labels: string[]
  data: number[]
}

export const handleSortChartData = (trafficEvents: TrafficEventsModel) => () =>
  trafficEvents.requestsByEndpoint?.reduce(
    ({ labels, data }, { endpoint, requestCount }): ChartDataModel => {
      labels.push(`${endpoint.charAt(0).toUpperCase()}${endpoint.slice(1)}`)
      data.push(requestCount)

      return {
        labels,
        data,
      }
    },
    { labels: [], data: [] } as ChartDataModel,
  )

export const HitsByResourceChart: FC<HitsByResourceChartProps> = ({ trafficEvents }) => {
  const sortedTrafficEvents = useMemo(handleSortChartData(trafficEvents), [trafficEvents])

  return (
    <Chart
      type="bar"
      data={{
        labels: sortedTrafficEvents?.labels,
        datasets: [
          {
            label: 'API Calls',
            categoryPercentage: 1,
            barPercentage: 0.5,
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) return

              const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
              gradient.addColorStop(1, '#4e56ea')
              gradient.addColorStop(0, '#7e9bfa')

              return gradient
            },
            borderColor: '#7A2C81',
            data: sortedTrafficEvents?.data,
          },
        ],
      }}
      options={{
        maintainAspectRatio: true,
        indexAxis: 'y',

        scales: {
          y: {
            beginAtZero: true,

            ticks: {
              font: {
                family: 'Inter',
                size: 15,
              },
            },
          },
          x: {
            ticks: {
              font: {
                family: 'Inter',
                size: 15,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            align: 'end',
            labels: {
              font: {
                family: 'Inter',
                size: 15,
              },
            },
          },
        },
      }}
    />
  )
}
