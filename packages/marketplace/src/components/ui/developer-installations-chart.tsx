import * as React from 'react'
import { Line } from 'react-chartjs-2'
import { H4, Loader } from '@reapit/elements'
import { InstallationModelWithAppName } from '@/components/ui/analytics/detailed/detailed-tab'
import { groupInstalledAppsByDate, getChartData, groupAppsByNameAndCount } from '@/utils/developer-analytics'

export interface DeveloperInstallationsChartProps {
  data: Array<InstallationModelWithAppName>
  loading?: boolean
}

export const getChartOptions = data => {
  return {
    legend: null,
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function(tooltipItem) {
          const installedApps = data[tooltipItem.label]
          if (installedApps.length === 0) return 'No App'
          const apps = groupAppsByNameAndCount(installedApps)
          return Object.values(apps)
            .map(app => `${app.name}: ${app.count}`)
            .join('\n')
        },
      },
    },
  }
}

const DeveloperInstallationsChart = ({ data, loading }: DeveloperInstallationsChartProps) => {
  const grouppedAppsByDate = groupInstalledAppsByDate(data)
  const labels = Object.keys(grouppedAppsByDate)

  const chartData = {
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
        data: getChartData(grouppedAppsByDate),
      },
    ],
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <H4>Installations</H4>
          <Line data={chartData} options={getChartOptions(grouppedAppsByDate)} />
        </>
      )}
    </div>
  )
}

export default DeveloperInstallationsChart
