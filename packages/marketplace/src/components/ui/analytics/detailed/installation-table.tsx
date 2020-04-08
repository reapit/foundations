import * as React from 'react'
import { Table, H4, Loader, toLocalTime, Pagination } from '@reapit/elements'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { AppInstallationsState } from '@/reducers/app-installations'
import { DeveloperState } from '@/reducers/developer'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import styles from '@/styles/pages/analytics.scss?mod'

export interface InstallationModelWithAppName extends InstallationModel {
  appName?: string
}

export const handleCountCurrentInstallationForEachApp = (
  installationAppDataArrayWithName: InstallationModelWithAppName[],
  developerDataArray: AppSummaryModel[],
) => (): { [appName: string]: number } => {
  const appHasInstallation = countAppHasInstallation(installationAppDataArrayWithName)
  const appNoInstallation = countAppNoInstallation(developerDataArray)
  return {
    ...appNoInstallation,
    ...appHasInstallation,
  }
}

/**
 * All app in here will show 0 because it's not installed
 */
export const countAppNoInstallation = (developerDataArray: AppSummaryModel[]): { [appName: string]: number } =>
  developerDataArray.reduce((prevValue, { name }) => {
    if (!name) {
      return prevValue
    }
    const newValue = { ...prevValue }
    newValue[name] = 0
    return newValue
  }, {}) as { [appName: string]: number }

/**
 * Count installations for each app has installation
 * E.g. return {appName1: 1, appName2: 0, appName3: 15}
 */
export const countAppHasInstallation = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
): { [appName: string]: number } =>
  installationsAppDataArrayWithName.reduce((prevValue, { appName, terminatesOn }) => {
    if (!appName || terminatesOn) {
      return prevValue
    }
    const newValue = { ...prevValue }
    if (prevValue[appName]) {
      newValue[appName]++
      return newValue
    }
    newValue[appName] = 1
    return newValue
  }, {}) as { [appName: string]: number }

export const handleUseMemoData = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
  pageNumber: number,
) => (): InstallationModelWithAppName[] => {
  const sortedInstallationsAppDataArray = sortAppByDateInstalled(installationsAppDataArrayWithName)
  const slicedInstallationAppDataArray = sortedInstallationsAppDataArray.slice(
    (pageNumber - 1) * INSTALLATIONS_PER_PAGE,
    pageNumber * INSTALLATIONS_PER_PAGE,
  )
  return slicedInstallationAppDataArray
}

export const sortAppByDateInstalled = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
): InstallationModelWithAppName[] => {
  const newAppData = [...installationsAppDataArrayWithName].sort(
    (a: InstallationModelWithAppName, b: InstallationModelWithAppName) => {
      if (!a.created || !b.created) {
        return 0
      }
      const dateA = new Date(a.created).getTime()
      const dateB = new Date(b.created).getTime()
      return dateA < dateB ? 1 : -1
    },
  )
  return newAppData
}

export const handleSetPageNumber = setPageNumber => (pageNumber: number) => setPageNumber(pageNumber)

export const installationTableColumn = [
  { Header: 'App Name', accessor: 'appName' },
  {
    Header: 'Client',
    accessor: 'client',
  },
  {
    Header: 'Date of installation',
    accessor: row => toLocalTime(row.created),
  },
  {
    Header: 'Date of Uninstallation',
    accessor: row => {
      return row.terminatesOn ? toLocalTime(row.terminatesOn) : ''
    },
  },
]

export const InstallationTable: React.FC<{
  installedApps: InstallationModelWithAppName[]
  filteredInstalledApps: InstallationModelWithAppName[]
  installations?: AppInstallationsState
  developer?: DeveloperState
  loading?: boolean
}> = ({ installedApps, filteredInstalledApps, installations, developer, loading }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const developerDataArray = developer?.developerData?.data?.data ?? []

  const appCountEntries = React.useMemo(handleCountCurrentInstallationForEachApp(installedApps, developerDataArray), [
    installedApps,
    developerDataArray,
  ])
  const memoizedData = React.useMemo(handleUseMemoData(filteredInstalledApps, pageNumber), [
    filteredInstalledApps,
    pageNumber,
  ])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <H4>Installations</H4>
          <p className="is-italic">
            The installations table below shows the individual installations per client with a total number of
            installations per app
          </p>
          <div className={styles.totalCount}>
            {Object.entries(appCountEntries).map(([appName, count]) => (
              <p key={appName}>
                Total current installations for <strong>{appName}</strong>: {count}
              </p>
            ))}
          </div>
          <Table bordered scrollable columns={installationTableColumn} data={memoizedData} loading={false} />
          <br />
          <Pagination
            pageNumber={pageNumber}
            onChange={handleSetPageNumber(setPageNumber)}
            pageSize={INSTALLATIONS_PER_PAGE}
            totalCount={installations?.installationsFilteredAppData?.totalCount ?? 0}
          />
        </>
      )}
    </div>
  )
}

export default InstallationTable
