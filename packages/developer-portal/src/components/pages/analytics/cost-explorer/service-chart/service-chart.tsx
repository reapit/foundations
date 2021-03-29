import React from 'react'
import ChartComponent, { Bar, ChartData, ChartComponentProps } from 'react-chartjs-2'
import { H5, DATE_TIME_FORMAT, Section, Loader } from '@reapit/elements'
import { AppSummaryModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { useDispatch, useSelector } from 'react-redux'
import { selectMyIdentity, selectBilling, selectDeveloperLoading, selectIsServiceChartLoading } from '@/selector'
import { fetchBilling } from '@/actions/developer'
import dayjs from 'dayjs'
import { Billing } from '@/reducers/developer'
import { Dispatch } from 'redux'
import { BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import ChartLegend from '@/components/ui/chart-legend'
import { ChartLegendItem } from '@/components/ui/chart-legend/chart-legend'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDeveloperIdFromConnectSession } from '@/utils/session'
import { chartContainer } from './__styles__/service-chart'

const API_CALL_INDEX = 0
const APP_LISTING_INDEX = 1
const DEVELOPER_EDITTION_INDEX = 2
const REAPIT_CONNECT_INDEX = 3
const DEVELOPER_REGISTRATION_INDEX = 4

export const datasets = [
  {
    label: 'API Calls',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [] as number[],
    totalCost: 0,
  },
  {
    label: 'App Listing',
    backgroundColor: 'rgba(81, 74, 177,0.2)',
    borderColor: 'rgba(81, 74, 177,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(81, 74, 177,0.4)',
    hoverBorderColor: 'rgba(81, 74, 177,1)',
    data: [] as number[],
    totalCost: 0,
  },
  {
    label: 'Developer Edition',
    backgroundColor: 'rgba(103, 195, 6,0.2)',
    borderColor: 'rgba(103, 195, 6,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(103, 195, 6,0.4)',
    hoverBorderColor: 'rgba(103, 195, 6,1)',
    data: [] as number[],
    totalCost: 0,
  },
  {
    label: 'Reapit Connect',
    backgroundColor: 'rgba(247, 144, 120, 0.2)',
    borderColor: 'rgba(247, 144, 120, 1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(247, 144, 120, 0.4)',
    hoverBorderColor: 'rgba(247, 144, 120, 1)',
    data: [] as number[],
    totalCost: 0,
  },
  {
    label: 'Developer Registration',
    backgroundColor: 'rgba(241, 139, 254, 0.2)',
    borderColor: 'rgba(241, 139, 254, 1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(241, 139, 254, 0.4)',
    hoverBorderColor: 'rgba(241, 139, 254, 1)',
    data: [] as number[],
    totalCost: 0,
  },
]

export const mapServiceChartDataSet = (billing: BillingOverviewForPeriodV2Model | null) => {
  const clonedDataSet = JSON.parse(JSON.stringify(datasets))

  const labels: string[] = []
  if (!billing?.periods) {
    return {
      labels,
      datasets: [],
    }
  }

  billing.periods.forEach((period) => {
    labels.push(period?.periodName || '')
    const services = period?.services || []
    const apiCallsData = services.find((service) => service.name === 'API Requests')?.cost || 0
    const developerEditionData = services.find((service) => service.name === 'Developer Edition')?.cost || 0
    const appListingData = services.find((service) => service.name === 'Application Listing')?.cost || 0
    const reapitConnectData = services.find((service) => service.name === 'Reapit Connect')?.cost || 0
    const developerRegistrationData = services.find((service) => service.name === 'Developer Registration')?.cost || 0

    clonedDataSet[API_CALL_INDEX].totalCost += apiCallsData
    clonedDataSet[APP_LISTING_INDEX].totalCost += appListingData
    clonedDataSet[DEVELOPER_EDITTION_INDEX].totalCost += developerEditionData
    clonedDataSet[REAPIT_CONNECT_INDEX].totalCost += reapitConnectData
    clonedDataSet[DEVELOPER_REGISTRATION_INDEX].totalCost += developerRegistrationData

    clonedDataSet[API_CALL_INDEX].data.push(apiCallsData)
    clonedDataSet[APP_LISTING_INDEX].data.push(appListingData)
    clonedDataSet[DEVELOPER_EDITTION_INDEX].data.push(developerEditionData)
    clonedDataSet[REAPIT_CONNECT_INDEX].data.push(reapitConnectData)
    clonedDataSet[DEVELOPER_REGISTRATION_INDEX].data.push(developerRegistrationData)
  })

  const sevicesHasCost = clonedDataSet.filter((dataset) => dataset.totalCost)

  return {
    labels,
    datasets: sevicesHasCost,
  }
}

export type StateProps = {
  myApps: AppSummaryModel[]
  myIdentity: DeveloperModel
  billing: Billing | null
  loading: boolean
  isServiceChartLoading: boolean
}

export type HandleUseEffectParams = {
  developerId: string
  dateFrom: string
  dateTo: string
  dispatch: Dispatch
}

export const handleUseEffect = ({ developerId, dateFrom, dateTo, dispatch }: HandleUseEffectParams) => () => {
  developerId && dispatch(fetchBilling({ developerId, dateFrom: dateFrom, dateTo: dateTo }))
}

export const renderChart = (
  datasets: ChartData<any>,
  chartRef: (node: Bar) => void,
  setChartLegendItems: React.Dispatch<React.SetStateAction<ChartLegendItem[] | undefined>>,
) => {
  return (
    <Bar
      ref={chartRef}
      data={datasets}
      width={50}
      height={50}
      options={{
        legendCallback: handleChartLegendCallback(setChartLegendItems),
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Total Cost ( £ )',
              },
            },
          ],
        },
      }}
    />
  )
}

export const handleChartLegendCallback = (
  setChartLegendItems: React.Dispatch<React.SetStateAction<ChartLegendItem[] | undefined>>,
) => {
  return (chart: ChartComponentProps) => {
    setChartLegendItems(chart.legend.legendItems)
  }
}

export const handleCallGenerateChartLegend = (chart?: ChartComponent<any>) => {
  return () => {
    // Need to call generateLegend whenever our billings data changed
    // Because we are using custom legend, and legendCallback is not called automatically
    // so we must call generateLegend() ourselves in code when creating a legend using this method.
    // https://www.chartjs.org/docs/latest/configuration/legend.html#html-legends
    chart?.chartInstance?.generateLegend()
  }
}

export const renderChartLegend = (chart?: ChartComponent<any>, chartLegendItems?: ChartLegendItem[]) => {
  if (!chart || !chartLegendItems) {
    return null
  }
  return <ChartLegend chartInstance={chart.chartInstance} chartLegendItems={chartLegendItems} />
}

export const handleChartCallbackRef = (setChartElement: React.Dispatch<React.SetStateAction<Bar | undefined>>) => {
  return (barChartElement: Bar) => {
    setChartElement(barChartElement)
  }
}

export const ServiceChart: React.FC = () => {
  const [chartElement, setChartElement] = React.useState<Bar | undefined>()

  const [chartLegendItems, setChartLegendItems] = React.useState<ChartLegendItem[]>()
  const dispatch = useDispatch()
  const myIdentity = useSelector(selectMyIdentity)
  const billing = useSelector(selectBilling)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = getDeveloperIdFromConnectSession(connectSession)

  const isDeveloperLoading = useSelector(selectDeveloperLoading)
  const isServiceChartLoading = useSelector(selectIsServiceChartLoading)

  const dateFrom = dayjs(myIdentity.created).format(DATE_TIME_FORMAT.YYYY_MM) as string
  const dateTo = dayjs().format(DATE_TIME_FORMAT.YYYY_MM)
  const chartRef = React.useCallback(handleChartCallbackRef(setChartElement), [])
  React.useEffect(handleUseEffect({ developerId, dateFrom, dateTo, dispatch }), [myIdentity.id, developerId])
  React.useEffect(handleCallGenerateChartLegend(chartElement), [billing, chartElement])
  const datasets = mapServiceChartDataSet(billing)

  if (isDeveloperLoading || isServiceChartLoading) {
    return <Loader />
  }

  return (
    <Section hasMargin={false} hasBorder>
      <H5>Services</H5>
      {renderChartLegend(chartElement, chartLegendItems)}
      <div className={chartContainer}>{renderChart(datasets, chartRef, setChartLegendItems)}</div>
    </Section>
  )
}

export default ServiceChart
