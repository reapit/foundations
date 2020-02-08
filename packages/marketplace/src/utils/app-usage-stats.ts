import { AppUsageStatsModel } from '@reapit/foundations-ts-definitions'

export const getAppUsageStatsChartData = (appUsageStats: AppUsageStatsModel[] = []) => {
  const appUsageStatsGroupedByDate = appUsageStats.reduce((accumulator, currentValue) => {
    const { appId, usage } = currentValue
    if (!usage || !appId) {
      return {}
    }
    usage.forEach(usageByDate => {
      const { date, requests } = usageByDate
      if (!date) {
        return
      }
      if (!accumulator[date]) {
        accumulator[date] = {
          [appId]: {
            appId,
            requests,
          },
          totalRequests: requests,
        }
      } else {
        accumulator[date] = {
          ...accumulator[date],
          ...{
            [appId]: {
              appId,
              requests,
            },
          },
          totalRequests: accumulator[date].totalRequests + requests,
        }
      }
    })
    return accumulator
  }, {})

  const labels = Object.keys(appUsageStatsGroupedByDate)
  const data = Object.values(appUsageStatsGroupedByDate).map(item => {
    return item.totalRequests
  })

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
          console.log('TCL: tooltipItem', tooltipItem)
          const appUsage = data[tooltipItem.label]
          if (!appUsage) {
            return 'No Data'
          }
          console.log('TCL: appUsage', appUsage)
          return Object.values(appUsage)
            .filter((app: any) => app.appId)
            .map((app: any) => {
              return `${app.appId}: ${app.requests}`
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
        data,
      },
    ],
  }
}
