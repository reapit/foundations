import * as React from 'react'
import dayjs from 'dayjs'
import DefaultFilterGroup from './default-filter-group'
import FilterForm from './filter-form'
import { PagedResultAppSummaryModel_, AppSummaryModel, InstallationModel } from '@reapit/foundations-ts-definitions'
import { DATE_TIME_FORMAT } from '@reapit/elements'

export type FilterBarProps = {
  developerAppsData: PagedResultAppSummaryModel_
  installationAppDataArray: InstallationModel[]
}

export type FilterFormInitialValues = {
  dateFrom: string
  dateTo: string
  clientId?: string
  appId?: string
}

const lastWeek = dayjs()
  .utc()
  .subtract(1, 'week')
export const lastMonday = lastWeek
  .startOf('week')
  .add(1, 'day')
  .format(DATE_TIME_FORMAT.YYYY_MM_DD)
export const lastSunday = lastWeek
  .endOf('week')
  .add(1, 'day')
  .format(DATE_TIME_FORMAT.YYYY_MM_DD)

export const prepareAppDeveloperAppData = developerAppsData => {
  const developerApps = developerAppsData.data || []
  const developerAppIds = developerApps.map((app: AppSummaryModel) => {
    return app.id || ''
  })
  return {
    developerApps,
    developerAppIds,
  }
}

export const prepareClientIds = installationAppDataArray => {
  const clientIds = installationAppDataArray
    .map((installation: InstallationModel) => {
      return installation.client || ''
    })
    .filter((x, i, a) => a.indexOf(x) == i)
  return clientIds
}

export const handleUseCallbackToPrepareFilterFormInitialValues = (dateFrom, dateTo) => {
  return () => {
    return {
      dateFrom: dateFrom,
      dateTo: dateTo,
      clientId: '',
      appId: '',
    } as FilterFormInitialValues
  }
}

export const FilterBar: React.FC<FilterBarProps> = ({ developerAppsData, installationAppDataArray }) => {
  const [dateFrom, setDateFrom] = React.useState(lastMonday)
  const [dateTo, setDateTo] = React.useState(lastSunday)

  const prepareFilterFormInitialValues = React.useCallback(
    handleUseCallbackToPrepareFilterFormInitialValues(dateFrom, dateTo),
    [dateFrom, dateTo],
  )

  const initialValues = prepareFilterFormInitialValues()
  const { developerApps, developerAppIds } = prepareAppDeveloperAppData(developerAppsData)
  const clientIds = prepareClientIds(installationAppDataArray)

  return (
    <>
      <DefaultFilterGroup
        appIds={developerAppIds}
        clientIds={clientIds}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />
      <FilterForm initialValues={initialValues} developerApps={developerApps} clientIds={clientIds} />
    </>
  )
}

export default FilterBar
