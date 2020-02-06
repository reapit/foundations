import * as React from 'react'
// import { groupBy } from 'lodash'
import { H4 } from '@reapit/elements'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { UsageStatsModel } from '@reapit/foundations-ts-definitions'
import { AppUsageStatsParams, appUsageStatsRequestData } from '@/actions/app-usage-stats'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
}

// const testAppUsage = [
//   {
//     appId: 'chien van do',
//     requestsForPeriod: 3,
//     usage: [
//       {
//         date: '2020-02-06T12:20:32.588Z',
//         requests: 0,
//       },
//       {
//         date: '2020-02-07T12:20:32.588Z',
//         requests: 3,
//       },
//     ],
//   },
//   {
//     appId: 'alibaba',
//     requestsForPeriod: 8,
//     usage: [
//       {
//         date: '2020-02-06T12:20:32.588Z',
//         requests: 5,
//       },
//       {
//         date: '2020-02-07T12:20:32.588Z',
//         requests: 3,
//       },
//     ],
//   },
// ]

// const testLabels = testAppUsage.reduce((result, item) => {}, {})

// const data = {
//   labels: ,
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

export interface AppUsageStatsMappedProps {
  appUsageStatsData: UsageStatsModel | null
  loading: boolean
}

export interface AppUsageStatsMappedActions {
  fetchAppUsageStats: (params: AppUsageStatsParams) => () => void
}

export const mapStateToProps = (state: ReduxState): AppUsageStatsMappedProps => {
  const {
    appUsageStats: { appUsageStatsData, loading },
  } = state
  return {
    appUsageStatsData,
    loading,
  }
}

export const mapDispatchToProps = (dispatch: any): AppUsageStatsMappedActions => ({
  fetchAppUsageStats: (params: AppUsageStatsParams) => () => {
    dispatch(appUsageStatsRequestData(params))
  },
})

export type AppUsageStatsProps = AppUsageStatsMappedProps & AppUsageStatsMappedActions

export const AppUsageStats: React.FC<AppUsageStatsProps> = ({ fetchAppUsageStats, appUsageStatsData, loading }) => {
  console.log('TCL: appUsageStatsData', appUsageStatsData)
  console.log('TCL: loading', loading)
  React.useEffect(fetchAppUsageStats({}), [])

  // const { appUsage } = appUsageStatsData || {}

  return (
    <div>
      <H4>Traffic (API Count)</H4>
      <Line data={data} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppUsageStats)
