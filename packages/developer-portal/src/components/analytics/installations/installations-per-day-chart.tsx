import 'chart.js/auto'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import dayjs from 'dayjs'

export interface InstallationsPerDayChartProps {
  installations: Marketplace.InstallationModelPagedResult
}

export interface ChartDataModel {
  labels: string[]
  data: number[]
}

export const handleSortChartData = (installations: Marketplace.InstallationModelPagedResult) => (): ChartDataModel => {
  if (!installations.data) {
    return {
      labels: [],
      data: [],
    }
  }

  const sortedInstallsByDate = installations.data.reduce<{ [key: string]: number }>((current, { created }) => {
    const date = dayjs(created).format('YYYY-MM-DD')

    current[date] = current[date] ? (current[date] += 1) : 1
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
              gradient.addColorStop(1, '#7e9bfa')
              gradient.addColorStop(0, '#fff')

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
