import * as React from 'react'
import { Table, H5, Loader, toLocalTime, Pagination, Grid, GridItem } from '@reapit/elements'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { AppInstallationsState } from '@/reducers/app-installations'
import { DeveloperState } from '@/reducers/developer'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import DeveloperInstallationsChart from '@/components/ui/developer-installations-chart'
import { handleMapAppNameToInstallation } from '@/components/ui/developer-analytics/detailed/detailed-tab'

export interface InstallationModelWithAppName extends InstallationModel {
  appName?: string
}

export type InstallationAppsRowType = {
  appName: string | undefined
  installation: number
}

export const handleCountCurrentInstallationForEachApp = (
  installationAppDataArrayWithName: InstallationModelWithAppName[],
  developerDataArray: AppSummaryModel[],
) => (): InstallationAppsRowType[] => {
  const appsHasInstallation = countAppsHasInstallation(installationAppDataArrayWithName)
  const appNamesHasInstallation = appsHasInstallation.map(app => app.appName)
  const appsHasNoInstallation = developerDataArray
    .filter(app => app.name && !appNamesHasInstallation.includes(app.name))
    .map(app => ({ appName: app.name, installation: 0 }))

  return [...appsHasNoInstallation, ...appsHasInstallation]
}

export const countAppsHasInstallation = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
): InstallationAppsRowType[] => {
  let temp = {}
  return installationsAppDataArrayWithName.reduce((prevValue, { appName, terminatesOn }) => {
    if (!appName || terminatesOn) {
      return prevValue
    }
    if (!temp[appName]) {
      temp[appName] = { appName, installation: 1 }
      prevValue.push(temp[appName])
    } else {
      temp[appName].installation++
    }
    return prevValue
  }, [] as InstallationAppsRowType[])
}

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

export const currentInstallationTableColumn = [
  { Header: 'App Name', accessor: 'appName' },
  {
    Header: 'Installations',
    accessor: 'installation',
  },
]

export const InstallationAppSection: React.FC<{
  installedApps: InstallationModelWithAppName[]
  filteredInstalledApps: InstallationModelWithAppName[]
  installations?: AppInstallationsState
  developer?: DeveloperState
  loading?: boolean
}> = ({ installedApps, filteredInstalledApps, installations, developer, loading }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const developerDataArray = developer?.developerData?.data?.data ?? []
  const installationFilterAppDataArray = installations?.installationsFilteredAppData?.data

  const memoizedData = React.useMemo(handleUseMemoData(filteredInstalledApps, pageNumber), [
    filteredInstalledApps,
    pageNumber,
  ])

  const currentInstallationApps = React.useMemo(
    handleCountCurrentInstallationForEachApp(installedApps, developerDataArray),
    [installedApps, developerDataArray],
  )

  const installationFilterAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationFilterAppDataArray, developerDataArray),
    [installationFilterAppDataArray, developerDataArray],
  )

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid isMultiLine className="mt-5">
            <GridItem className="is-half">
              <DeveloperInstallationsChart data={installationFilterAppDataArrayWithName} />
            </GridItem>
            <GridItem className="is-half">
              <H5>Current Installations</H5>
              <p className="is-italic">
                The installations table below shows the individual installations per client with a total number of
                installations per app
              </p>
              <br />
              <Table
                bordered
                scrollable
                columns={currentInstallationTableColumn}
                data={currentInstallationApps}
                loading={false}
              />
            </GridItem>
          </Grid>
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

export default InstallationAppSection
