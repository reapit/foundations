import 'chart.js/auto'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'

export interface InstallationsByAppChartProps {
  installations: InstallationModelPagedResult
}

export interface ChartDataModel {
  labels: string[]
  data: number[]
}

export const handleSortChartData = (installations: InstallationModelPagedResult) => () => {
  if (!installations.data) {
    return {
      labels: [],
      data: [],
    }
  }

  const sortedInstallsByApp = installations.data.reduce<{ [key: string]: number }>((current, { appName }) => {
    const name = appName ?? ''
    current[name] = current[name] ? (current[name] += 1) : 1
    return current
  }, {})

  const labels = Object.keys(sortedInstallsByApp)
  const data = labels.map((label) => sortedInstallsByApp[label])

  return {
    labels,
    data,
  }
}

export const InstallationsByAppChart: FC<InstallationsByAppChartProps> = ({ installations }) => {
  const sortedInstallations = useMemo(handleSortChartData(installations), [installations])

  return (
    <Chart
      type="bar"
      data={{
        labels: sortedInstallations.labels,
        datasets: [
          {
            label: 'Installations',
            categoryPercentage: 1,
            barPercentage: 0.5,
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) return

              const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
              gradient.addColorStop(1, 'rgba(236, 99, 27, 1)')
              gradient.addColorStop(0, 'rgba(236, 99, 27, 0.5)')

              return gradient
            },
            borderColor: '#7A2C81',
            data: sortedInstallations.data,
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
