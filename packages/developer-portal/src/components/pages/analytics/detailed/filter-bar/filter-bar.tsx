import * as React from 'react'
import DefaultFilterGroup, { prepareDefaultFilterDateParams } from './default-filter-group'
import FilterForm from './filter-form'
import { AppSummaryModel, InstallationModel } from '@reapit/foundations-ts-definitions'
import { Content } from '@reapit/elements'
import { SANDBOX_CLIENT_ID } from '../../../../../constants/api'

export type FilterBarProps = {
  developerAppsData: AppSummaryModel[]
  installationAppDataArray: InstallationModel[]
}

export type FilterFormInitialValues = {
  dateFrom: string
  dateTo: string
  clientId?: string
  appId?: string
}

const { defaultParams } = prepareDefaultFilterDateParams()

export const prepareAppDeveloperAppData = (developerAppsData: AppSummaryModel[]) => {
  const developerApps = developerAppsData || []
  const developerAppIds = developerApps.map((app: AppSummaryModel) => {
    return app.id || ''
  })
  return {
    developerApps,
    developerAppIds,
  }
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
  const [dateFrom, setDateFrom] = React.useState(defaultParams.dateFrom)
  const [dateTo, setDateTo] = React.useState(defaultParams.dateTo)

  const prepareFilterFormInitialValues = React.useCallback(
    handleUseCallbackToPrepareFilterFormInitialValues(dateFrom, dateTo),
    [dateFrom, dateTo],
  )

  const initialValues = prepareFilterFormInitialValues()
  const { developerApps, developerAppIds } = prepareAppDeveloperAppData(developerAppsData)

  return (
    <Content>
      <DefaultFilterGroup appIds={developerAppIds} setDateFrom={setDateFrom} setDateTo={setDateTo} />
      <FilterForm
        initialValues={initialValues}
        developerApps={developerApps}
        installationAppDataArray={installationAppDataArray}
      />
    </Content>
  )
}

export default FilterBar
