import * as React from 'react'
import { Table, H5, Loader, toLocalTime, Pagination, Grid, GridItem, Section } from '@reapit/elements'
import { InstallationModel, AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import DeveloperInstallationsChart from '@/components/pages/analytics/detailed/installations-chart'
import { handleMapAppNameToInstallation } from '@/components/pages/analytics/detailed/detailed-tab'
import {
  selectInstallationsFilterList,
  selectInstallationsLoading,
  selectInstallationsFilterLoading,
} from '@/selector/installations'
import { useSelector } from 'react-redux'
import FadeIn from '../../../../styles/fade-in'

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
  const appNamesHasInstallation = appsHasInstallation.map((app) => app.appName)
  const appsHasNoInstallation = developerDataArray
    .filter((app) => app.name && !appNamesHasInstallation.includes(app.name))
    .map((app) => ({ appName: app.name, installation: 0 }))

  return [...appsHasNoInstallation, ...appsHasInstallation]
}

export const countAppsHasInstallation = (
  installationsAppDataArrayWithName: InstallationModelWithAppName[],
): InstallationAppsRowType[] => {
  const temp = {}
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

export const handleSetPageNumber = (setPageNumber) => (pageNumber: number) => setPageNumber(pageNumber)

export const installationTableColumn: { Header: string; accessor: string | ((data) => string) }[] = [
  { Header: 'App Name', accessor: 'appName' },
  {
    Header: 'Client',
    accessor: 'client',
  },
  {
    Header: 'Company Name',
    accessor: 'customerName',
  },
  {
    Header: 'Company Address',
    accessor: ({ customerAddress = {} }: { customerAddress: InstallationModel['customerAddress'] }) => {
      const {
        buildingName = '',
        buildingNumber = '',
        line1 = '',
        line2 = '',
        line3 = '',
        line4 = '',
        postcode = '',
        countryId = '',
      } = customerAddress

      return `${buildingName} ${buildingNumber} ${line1} ${line2} ${line3} ${line4} ${postcode} ${countryId}`
    },
  },
  {
    Header: 'Date of installation',
    accessor: (row) => toLocalTime(row.created),
  },
  {
    Header: 'Date of Uninstallation',
    accessor: (row) => {
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
  apps?: AppSummaryModel[]
}> = ({ installedApps, filteredInstalledApps, apps = [] }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1)
  const installationFilterAppData = useSelector(selectInstallationsFilterList)

  const installationListLoading = useSelector(selectInstallationsLoading)
  const installationsFilterLoading = useSelector(selectInstallationsFilterLoading)

  const memoizedData = React.useMemo(handleUseMemoData(filteredInstalledApps, pageNumber), [
    filteredInstalledApps,
    pageNumber,
  ])

  const currentInstallationApps = React.useMemo(handleCountCurrentInstallationForEachApp(installedApps, apps), [
    installedApps,
    apps,
  ])

  const installationFilterAppDataArrayWithName = React.useMemo(
    handleMapAppNameToInstallation(installationFilterAppData?.data, apps),
    [installationFilterAppData, apps],
  )

  return (
    <>
      {installationListLoading ? (
        <Loader />
      ) : (
        <>
          <Grid isMultiLine>
            <GridItem className="is-half">
              <DeveloperInstallationsChart
                loading={installationsFilterLoading}
                data={installationFilterAppDataArrayWithName}
              />
            </GridItem>
            <GridItem className="is-half">
              <Section hasMargin={false}>
                <H5>Current Installations</H5>
                <p className="is-italic">
                  The installations table below shows the individual installations per client with a total number of
                  installations per app
                </p>
                <br />
                <FadeIn>
                  <Table
                    bordered
                    scrollable
                    columns={currentInstallationTableColumn}
                    data={currentInstallationApps}
                    loading={false}
                  />
                </FadeIn>
              </Section>
            </GridItem>
          </Grid>
          <Section>
            <H5>Installation Details</H5>
            <FadeIn>
              <Table bordered scrollable columns={installationTableColumn} data={memoizedData} loading={false} />
            </FadeIn>
          </Section>
          <Pagination
            pageNumber={pageNumber}
            onChange={handleSetPageNumber(setPageNumber)}
            pageSize={INSTALLATIONS_PER_PAGE}
            totalCount={installationFilterAppData?.totalCount ?? 0}
          />
        </>
      )}
    </>
  )
}

export default InstallationAppSection
