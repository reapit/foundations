import 'chart.js/auto'
import { AppSummaryModelPagedResult, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { useAnalyticsState } from '../state/use-analytics-state'

export interface InstallationsByAppChartProps {
  installations: InstallationModelPagedResult
}

export interface ChartDataModel {
  labels: string[]
  data: number[]
}

export const handleSortChartData =
  (installations: InstallationModelPagedResult, apps: AppSummaryModelPagedResult | null) => () => {
    if (!installations.data || !apps?.data) {
      return {
        labels: [],
        data: [],
      }
    }

    const sortedInstallsByApp = installations.data.reduce<{ [key: string]: number }>((current, { appId }) => {
      const name = apps.data?.find((app) => app && app.id === appId)?.name ?? ''

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
  const { analyticsDataState } = useAnalyticsState()
  const { apps } = analyticsDataState
  const sortedInstallations = useMemo(handleSortChartData(installations, apps), [installations, apps])

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
