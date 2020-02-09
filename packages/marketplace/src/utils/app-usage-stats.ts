import { AppUsageStatsModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import orderBy from 'lodash.orderby'
import { toLocalTime } from '@reapit/elements'

export const getAppUsageStatsChartData = (appUsageStats?: AppUsageStatsModel[], developerApps?: AppSummaryModel[]) => {
  const appUsageStatsGroupedByDate = appUsageStats?.reduce((accumulator, currentValue) => {
    const { appId, usage } = currentValue || {}
    const developerApp = developerApps?.find(app => app.id === appId)
    if (developerApp && developerApp.id) {
      const { id: developerAppId, name: developerAppName } = developerApp
      usage?.forEach(usageByDate => {
        const { date, requests } = usageByDate
        if (!date) {
          return null
        }
        const formattedDate = toLocalTime(date, 'DD/MM/YYYY')
        if (!accumulator[formattedDate]) {
          accumulator[formattedDate] = {
            [developerAppId]: {
              appName: developerAppName,
              requests,
            },
            date: new Date(date),
            totalRequests: requests,
          }
        } else {
          accumulator[formattedDate] = {
            ...accumulator[formattedDate],
            ...{
              [developerAppId]: {
                appName: developerAppName,
                requests,
              },
            },
            date: new Date(date),
            totalRequests: accumulator[formattedDate].totalRequests + requests,
          }
        }
      })
    }
    return accumulator
  }, {})

  if (!appUsageStatsGroupedByDate || Object.keys(appUsageStatsGroupedByDate).length === 0) {
    return null
  }

  const orderedAppUsageStats = orderBy(appUsageStatsGroupedByDate, ['date'], ['asc'])
  const labels = orderedAppUsageStats.map(item => toLocalTime(item.date, 'DD/MM/YYYY'))
  const data = orderedAppUsageStats.map(item => item.totalRequests)

  return {
    labels,
    data,
    appUsageStatsGroupedByDate,
  }
}

export const getChartOptions = data => {
  return {
    legend: null,
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function(tooltipItem) {
          const appUsage = data[tooltipItem.label]
          if (!appUsage) {
            return 'No Data'
          }
          return Object.values(appUsage)
            .filter((app: any) => app.appName)
            .map((app: any) => {
              return `${app.appName}: ${app.requests}`
            })
        },
      },
    },
  }
}

export const getChartConfig = (labels: string[], data: number[]) => {
  return {
    labels,
    datasets: [
      {
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
        data,
      },
    ],
  }
}
