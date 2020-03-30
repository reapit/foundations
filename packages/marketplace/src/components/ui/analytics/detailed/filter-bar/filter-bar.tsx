import * as React from 'react'
import dayjs from 'dayjs'
import DefaultFilterGroup from './default-filter-group'
import FilterForm from './filter-form'
import { AppUsageStatsParams } from '@/actions/app-usage-stats'
import { PagedResultAppSummaryModel_, AppSummaryModel, InstallationModel } from '@reapit/foundations-ts-definitions'

export type FilterBarProps = {
  developerAppsData: PagedResultAppSummaryModel_
  installationAppDataArray: InstallationModel[]
  loadStats: (params: AppUsageStatsParams) => void
}

export type FilterFormInitialValues = {
  dateFrom: string
  dateTo: string
  clientId?: string
  appId?: string
}

const lastWeek = dayjs().subtract(1, 'week')
const lastMonday = lastWeek.day(1).toISOString()
const lastSunday = lastWeek.day(7).toISOString()

const FilterBar: React.FC<FilterBarProps> = ({ loadStats, developerAppsData, installationAppDataArray }) => {
  const [dateFrom, setDateFrom] = React.useState(lastMonday)
  const [dateTo, setDateTo] = React.useState(lastSunday)

  const developerApps = developerAppsData.data || []
  const developerAppIds = developerApps.map((app: AppSummaryModel) => {
    return app.id || ''
  })

  const clientIds = installationAppDataArray.map((installation: InstallationModel) => {
    return installation.client || ''
  })

  const prepareFilterFormInitialValues = React.useCallback((): FilterFormInitialValues => {
    return {
      dateFrom: dateFrom,
      dateTo: dateTo,
      clientId: '',
      appId: '',
    }
  }, [dateFrom, dateTo])

  return (
    <>
      <DefaultFilterGroup
        appIds={developerAppIds}
        clientIds={clientIds}
        loadStats={loadStats}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />
      <FilterForm
        initialValues={prepareFilterFormInitialValues()}
        developerApps={developerApps}
        installationApps={installationAppDataArray}
      />
    </>
  )
}

export default FilterBar
