import 'chart.js/auto'
import { TrafficEventsModel } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'

export interface HitsPerDayChartProps {
  trafficEvents: TrafficEventsModel
}

export interface ChartDataModel {
  labels: string[]
  data: number[]
}

export const handleSortChartData = (trafficEvents: TrafficEventsModel) => () =>
  trafficEvents.requestsByDate?.reduce<ChartDataModel>(
    ({ labels, data }, { date, requestCount }) => {
      labels.push(date)
      data.push(requestCount)

      return {
        labels,
        data,
      }
    },
    { labels: [], data: [] },
  )

export const HitsPerDayChart: FC<HitsPerDayChartProps> = ({ trafficEvents }) => {
  const sortedTrafficEvents = useMemo(handleSortChartData(trafficEvents), [trafficEvents])

  return (
    <Chart
      type="line"
      data={{
        labels: sortedTrafficEvents?.labels,
        datasets: [
          {
            fill: true,
            label: 'API Calls',
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) return

              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
              gradient.addColorStop(1, '#4e56ea')
              gradient.addColorStop(0, '#7e9bfa')

              return gradient
            },
            borderColor: '#4e56ea',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#4e56ea',
            pointBackgroundColor: '#4e56ea',
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#4e56ea',
            pointHoverBorderColor: '#4e56ea',
            pointHoverBorderWidth: 4,

            data: sortedTrafficEvents?.data,
          },
        ],
      }}
      options={{
        maintainAspectRatio: true,
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
