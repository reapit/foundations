import 'chart.js/auto'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import dayjs from 'dayjs'

export interface InstallationsPerDayChartProps {
  installations: InstallationModelPagedResult
}

export interface ChartDataModel {
  labels: string[]
  data: number[]
}

export const handleSortChartData = (installations: InstallationModelPagedResult) => (): ChartDataModel => {
  if (!installations.data) {
    return {
      labels: [],
      data: [],
    }
  }

  const sortedInstallsByDate = installations.data.reduce<{ [key: string]: number }>((current, { created }) => {
    const date = dayjs(created).format('YYYY-MM-DD')

    if (current[date]) {
      current[date] += 1
      return current
    }

    current[date] = 1
    return current
  }, {})

  const labels = Object.keys(sortedInstallsByDate)
  const data = labels.map((label) => sortedInstallsByDate[label])

  return {
    labels,
    data,
  }
}

export const InstallationsPerDayChart: FC<InstallationsPerDayChartProps> = ({ installations }) => {
  const sortedInstallations = useMemo(handleSortChartData(installations), [installations])

  return (
    <Chart
      type="line"
      data={{
        labels: sortedInstallations.labels,
        datasets: [
          {
            fill: true,
            label: 'Installations',
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) return

              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
              gradient.addColorStop(1, 'rgba(122, 44, 129, 0.5)')
              gradient.addColorStop(0, '#fff')

              return gradient
            },
            borderColor: '#7A2C81',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#7A2C81',
            pointBackgroundColor: '#7A2C81',
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#7A2C81',
            pointHoverBorderColor: '#7A2C81',
            pointHoverBorderWidth: 4,

            data: sortedInstallations.data,
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
                family: 'PT Sans',
                size: 16,
              },
            },
          },
          x: {
            ticks: {
              font: {
                family: 'PT Sans',
                size: 16,
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
                family: 'PT Sans',
                size: 16,
              },
            },
          },
        },
      }}
    />
  )
}
