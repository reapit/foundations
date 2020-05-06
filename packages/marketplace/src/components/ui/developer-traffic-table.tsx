import React, { useMemo } from 'react'
import { UsageStatsModel, PagedResultAppSummaryModel_, AppUsageStatsModel } from '@reapit/foundations-ts-definitions'
import { H4, Table, toLocalTime, Loader } from '@reapit/elements'
import styles from '@/styles/pages/developer-analytics.scss?mod'

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
      columnProps: {
        width: 300,
      },
    },
  ]
}

export const calculateTotalRequest = (usageStatsData?: AppUsageStats[]) => {
  if (!usageStatsData) {
    return 0
  }
  return usageStatsData.reduce((previousValue, currentValue) => {
    const requests = currentValue.requests || 0
    return previousValue + requests
  }, 0)
}

const DeveloperTrafficTable: React.FC<DeveloperAppTrafficProps> = ({ stats, apps, loading }) => {
  const usageStatsData = useMemo(generateUsageStatsData({ apps, stats }), [stats, apps]) || []
  const usageStatsColumns = useMemo(generateUsageStatsColumns(), [usageStatsData])

  const renderTotalRequest = () => {
    return (
      <div className={`${styles.totalApiCountWrapper}`}>
        <H4 className={`${styles.totalCount} is-pulled-left`}>
          Total API Calls: {calculateTotalRequest(usageStatsData)}
        </H4>
      </div>
    )
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <H4>Traffic</H4>
          <p className="is-italic">
            The traffic table below shows all API calls made against each of your applications since the date your app
            was created
          </p>
          <Table bordered scrollable columns={usageStatsColumns} data={usageStatsData} loading={false} />
          {renderTotalRequest()}
        </>
      )}
    </div>
  )
}

export default DeveloperTrafficTable
