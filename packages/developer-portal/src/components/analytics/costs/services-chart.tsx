import 'chart.js/auto'
import { BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { Loader } from '@reapit/elements'
import { ChartDataset } from 'chart.js/auto'
import { useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitConnect } from '@reapit/connect-session'
import { useAnalyticsState } from '../state/use-analytics-state'

export interface ChartDataSetModel {
  [key: string]: number[]
}

export interface ChartDataModel {
  label: string
  data: number[]
}

export const GRADIENTS = [
  { start: '#ffc666', end: '#ffa000' },
  { start: '#ff9f66', end: '#ff6000' },
  { start: '#66b2ff', end: '#0080ff' },
  { start: '#b28cff', end: '#8040ff' },
  { start: '#64d2c8', end: '#009b96' },
]

export const handleSortChartData = (billing: BillingOverviewForPeriodV2Model | null) => () => {
  const dataLabels: string[] = []
  const dataSetsObject: ChartDataSetModel = {}

  billing?.periods?.forEach(({ services, periodName }) => {
    if (!periodName || !services) return
    dataLabels.push(periodName)
    services.forEach(({ name = '', cost = 0 }) => {
      const currentService = dataSetsObject[name] ?? []
      dataSetsObject[name] = [...currentService, cost]
    })
  })

  const dataSets: ChartDataModel[] = Object.keys(dataSetsObject).map((key) => ({
    label: key,
    data: dataSetsObject[key],
  }))

  return { dataLabels, dataSets }
}

export const ServicesChart: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { analyticsFilterState } = useAnalyticsState()
  const developerId = connectSession?.loginIdentity.developerId
  const { clientId, appId, monthFrom, monthTo } = analyticsFilterState
  const appsQuery = appId ? { applicationId: appId } : {}
  const customerIdQuery = clientId ? { customerId: clientId } : {}

  const [billing, billingLoading] = useReapitGet<BillingOverviewForPeriodV2Model>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getBillingDataByPeriod],
    queryParams: { dateFrom: monthFrom, dateTo: monthTo, ...appsQuery, ...customerIdQuery, developerId },
    headers: {
      ['api-version']: '2',
    },
    fetchWhenTrue: [monthFrom, monthTo, developerId],
  })
  const sortedBilling = useMemo(handleSortChartData(billing), [billing])

  return billingLoading ? (
    <Loader />
  ) : (
    <Chart
      type="bar"
      data={{
        labels: sortedBilling.dataLabels,
        datasets:
          (sortedBilling.dataSets?.map((billing, index) => ({
            label: billing?.label,
            backgroundColor: (context) => {
              const chart = context.chart
              const { ctx, chartArea } = chart

              if (!chartArea) return

              const { start, end } = GRADIENTS[index] ?? GRADIENTS[0]
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
              gradient.addColorStop(0, start)
              gradient.addColorStop(1, end)

              return gradient
            },
            data: billing?.data,
          })) as ChartDataset<'bar', any>[]) ?? [],
      }}
      options={{
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            ticks: {
              font: {
                family: 'PT Sans',
                size: 16,
              },
            },
          },
          x: {
            stacked: true,
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
            align: 'start',
            position: 'right',
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
