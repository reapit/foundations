import React, { useMemo } from 'react'
import { UsageStatsModel, PagedResultAppSummaryModel_, AppUsageStatsModel } from '@reapit/foundations-ts-definitions'
import { H4, Table, toLocalTime, Alert } from '@reapit/elements'

export interface DeveloperAppTrafficProps {
  stats: UsageStatsModel
  apps: PagedResultAppSummaryModel_
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
      accessor: row => toLocalTime(row.created),
    },
    {
      Header: 'Total API Calls',
      accessor: 'requests',
    },
  ]
}

const DeveloperTrafficTable: React.FC<DeveloperAppTrafficProps> = ({ stats, apps }) => {
  const usageStatsData = useMemo(generateUsageStatsData({ apps, stats }), [stats, apps])
  const usageStatsColumns = useMemo(generateUsageStatsColumns(), [usageStatsData])
  return (
    <div>
      <H4>Traffic</H4>
      <p>
        The traffic table below shows all API calls made against each of your applications since the date your app was
        created
      </p>
      {usageStatsData && usageStatsData.length > 0 ? (
        <Table bordered scrollable columns={usageStatsColumns} data={usageStatsData} loading={false} />
      ) : (
        <Alert message="You currently have no apps usage stats " type="info" />
      )}
    </div>
  )
}

export default DeveloperTrafficTable
