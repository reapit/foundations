import 'chart.js/auto'
import { BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import React, { FC, useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import { Loader } from '@reapit/elements'
import { ChartDataset } from 'chart.js/auto'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
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
  { start: 'rgba(236, 99, 27, 1)', end: 'rgba(236, 99, 27, 0.5)' },
  { start: 'rgba(0, 101, 128, 1)', end: 'rgba(0, 101, 128, 0.5)' },
  { start: 'rgba(122, 44, 129, 1)', end: 'rgba(122, 44, 129, 0.5)' },
  { start: 'rgba(0, 97, 168, 1)', end: 'rgba(0, 97, 168, 0.5)' },
  { start: 'rgba(35, 164, 222, 1)', end: 'rgba(35, 164, 222, 0.5)' },
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
    action: getActions(process.env.appEnv)[GetActionNames.getBillingDataByPeriod],
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
