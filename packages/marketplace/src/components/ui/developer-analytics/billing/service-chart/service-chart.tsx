import React from 'react'
import { Bar, ChartData } from 'react-chartjs-2'
import { H4, FlexContainerResponsive, DATE_TIME_FORMAT, Loader } from '@reapit/elements'
import { AppSummaryModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/developer-analytics.scss?mod'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDeveloperApps,
  selectMyIdentity,
  selectBilling,
  selectDeveloperLoading,
  selectIsServiceChartLoading,
} from '@/selector'
import { fetchBilling } from '@/actions/developer'
import dayjs from 'dayjs'
import { Billing, RequestByPeriod } from '@/reducers/developer'
import { Dispatch } from 'redux'

export const mapServiceChartDataSet = (billing: Billing | null) => {
  let datasets = [
    {
      label: 'Resource',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [] as number[],
    },
  ]
  let labels: string[] = []
  if (!billing) {
    return {
      labels,
      datasets,
    }
  }
  billing.requestsByPeriod.forEach((item: RequestByPeriod) => {
    labels.push(item.periodName)
    datasets[0].data.push(item.grossAmount)
  })
  return {
    labels,
    datasets,
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
  myAppIds: string[]
  dateFrom: string
  dateTo: string
  dispatch: Dispatch
}

export const handleUseEffect = ({ myAppIds, dateFrom, dateTo, dispatch }: HandleUseEffectParams) => () => {
  const isHaveDeveloperApps = myAppIds.length > 0
  if (isHaveDeveloperApps) {
    dispatch(fetchBilling({ applicationId: myAppIds, dateFrom: dateFrom, dateTo: dateTo }))
  }
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
                labelString: 'Total cost',
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
  const myApps = useSelector(selectDeveloperApps)
  const myIdentity = useSelector(selectMyIdentity)
  const billing = useSelector(selectBilling)
  const loading = useSelector(selectDeveloperLoading)
  const isServiceChartLoading = useSelector(selectIsServiceChartLoading)

  const myAppIds = myApps.map((item: AppSummaryModel) => item.id) as string[]
  const dateFrom = dayjs(myIdentity.created).format(DATE_TIME_FORMAT.YYYY_MM) as string
  const dateTo = dayjs().format(DATE_TIME_FORMAT.YYYY_MM)
  React.useEffect(handleUseEffect({ myAppIds, dateFrom, dateTo, dispatch }), [myIdentity.id, myApps.length])
  const datasets = mapServiceChartDataSet(billing)
  const isLoading = loading || isServiceChartLoading
  return (
    <FlexContainerResponsive className={styles.serviceChart}>
      <div className={styles.barChartContainer}>
        <H4>Services</H4>
        {renderChart(isLoading, datasets)}
      </div>
    </FlexContainerResponsive>
  )
}

export default ServiceChart
