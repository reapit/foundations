import React from 'react'
import { Bar, ChartData } from 'react-chartjs-2'
import { H5, DATE_TIME_FORMAT, Loader, Section } from '@reapit/elements'
import { AppSummaryModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/developer-analytics.scss?mod'
import { useDispatch, useSelector } from 'react-redux'
import { selectMyIdentity, selectBilling, selectDeveloperLoading, selectIsServiceChartLoading } from '@/selector'
import { fetchBilling } from '@/actions/developer'
import dayjs from 'dayjs'
import { Billing } from '@/reducers/developer'
import { Dispatch } from 'redux'
import { BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import { selectDeveloperId } from '@/selector/auth'

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

  let labels: string[] = []
  if (!billing?.periods) {
    return {
      labels,
      datasets: clonedDataSet,
    }
  }

  billing.periods.map(period => {
    labels.push(period?.periodName || '')
    const services = period?.services || []
    const apiCallsData = services.find(service => service.name === 'API Requests')?.cost || 0
    const developerEditionData = services.find(service => service.name === 'Developer Edition')?.cost || 0
    const appListingData = services.find(service => service.name === 'Application Listing')?.cost || 0
    const reapitConnectData = services.find(service => service.name === 'Reapit Connect')?.cost || 0
    const developerRegistrationData = services.find(service => service.name === 'Developer Registration')?.cost || 0

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

  const sevicesHasCost = clonedDataSet.filter(dataset => dataset.totalCost)

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
  dispatch(fetchBilling({ developerId, dateFrom: dateFrom, dateTo: dateTo }))
}

export const renderChart = (isLoading: boolean, datasets: ChartData<any>) => {
  if (isLoading) {
    return <Loader />
  }
  return (
    <Bar
      data={datasets}
      width={50}
      height={50}
      options={{
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

export const ServiceChart: React.FC = () => {
  const dispatch = useDispatch()
  const myIdentity = useSelector(selectMyIdentity)
  const billing = useSelector(selectBilling)
  const loading = useSelector(selectDeveloperLoading)
  const isServiceChartLoading = useSelector(selectIsServiceChartLoading)
  const developerId = useSelector(selectDeveloperId)

  const dateFrom = dayjs(myIdentity.created).format(DATE_TIME_FORMAT.YYYY_MM) as string
  const dateTo = dayjs().format(DATE_TIME_FORMAT.YYYY_MM)
  React.useEffect(handleUseEffect({ developerId, dateFrom, dateTo, dispatch }), [myIdentity.id, developerId])
  const datasets = mapServiceChartDataSet(billing)
  const isLoading = loading || isServiceChartLoading
  return (
    <Section hasMargin={false}>
      <H5>Services</H5>
      <div className={styles.barChartContainer}>{renderChart(isLoading, datasets)}</div>
    </Section>
  )
}

export default ServiceChart
