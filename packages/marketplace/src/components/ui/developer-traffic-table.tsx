import React, { useMemo } from 'react'
import { UsageStatsModel, PagedResultAppSummaryModel_, AppUsageStatsModel } from '@reapit/foundations-ts-definitions'
import { H4, Table, toLocalTime, Loader } from '@reapit/elements'

export interface DeveloperAppTrafficProps {
  stats: UsageStatsModel
  apps: PagedResultAppSummaryModel_
  loading?: Boolean
}

export interface AppUsageStats {
  appName?: string
  created?: string
  requests?: number
}

export const generateUsageStatsData = ({ apps, stats }: DeveloperAppTrafficProps) => () => {
  return apps.data?.reduce<AppUsageStats[]>((prev, app) => {
    const appUsage = stats.appUsage?.find((item: AppUsageStatsModel) => item.appId === app.id)
    const result = {
      appName: app.name,
      created: app.created,
      requests: appUsage ? appUsage.requestsForPeriod : 0,
    }
    return [...prev, result]
  }, [])
}

export const generateUsageStatsColumns = () => () => {
  return [
    {
      Header: 'App Name',
      accessor: 'appName',
    },

    {
      Header: 'Date Created',
      accessor: row => toLocalTime(row.created, 'DD/MM/YYYY'),
    },
    {
      Header: 'Total API Calls',
      accessor: 'requests',
    },
  ]
}

const DeveloperTrafficTable: React.FC<DeveloperAppTrafficProps> = ({ stats, apps, loading }) => {
  const usageStatsData = useMemo(generateUsageStatsData({ apps, stats }), [stats, apps]) || []
  const usageStatsColumns = useMemo(generateUsageStatsColumns(), [usageStatsData])
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <H4>Traffic</H4>
          <p>
            The traffic table below shows all API calls made against each of your applications since the date your app
            was created
          </p>
          <Table bordered scrollable columns={usageStatsColumns} data={usageStatsData} loading={false} />
        </>
      )}
    </div>
  )
}

export default DeveloperTrafficTable
