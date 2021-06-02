import React, { Dispatch, SetStateAction } from 'react'
import { Table, H5, toLocalTime, Pagination, FadeIn } from '@reapit/elements'
import { InstallationModel, AppSummaryModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { INSTALLATIONS_PER_PAGE } from '@/constants/paginator'
import { selectInstallationsList, selectInstallationsLoading } from '@/selector/installations'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { selectAppsListState } from '../../../selector/apps'
import { Loader } from '@reapit/elements/v3'

export interface InstallationModelWithAppName extends InstallationModel {
  appName: string
}

export interface InstallationRowType {
  Header: string
  accessor: string | ((data: InstallationModelWithAppName) => string)
}

export const handleMemoisedData = (
  installationsListData: InstallationModelPagedResult | null,
  appsListData: AppSummaryModel[] | undefined,
  pageNumber: number,
) => (): InstallationModelWithAppName[] => {
  const installationsWithAppName =
    installationsListData?.data?.map((installation) => {
      const appName = appsListData?.find((app) => app.id === installation.appId)?.name ?? ''

      return {
        ...installation,
        appName,
      }
    }) || []

  return installationsWithAppName.slice((pageNumber - 1) * INSTALLATIONS_PER_PAGE, pageNumber * INSTALLATIONS_PER_PAGE)
}

export const handleSetPageNumber = (setPageNumber: Dispatch<SetStateAction<number>>) => (pageNumber: number) =>
  setPageNumber(pageNumber)

export const installationTableColumns: InstallationRowType[] = [
  { Header: 'App Name', accessor: 'appName' },
  {
    Header: 'Installed By',
    accessor: 'installedBy',
  },
  {
    Header: 'Date of Installation',
    accessor: (row) => {
      return row.created ? toLocalTime(row.created) : ''
    },
  },
  {
    Header: 'Uninstalled By',
    accessor: 'uninstalledBy',
  },
  {
    Header: 'Date of Uninstallation',
    accessor: (row) => {
      return row.terminatesOn ? toLocalTime(row.terminatesOn) : ''
    },
  },
]

export const InstallationsTable: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const installationsListData = useSelector(selectInstallationsList)
  const installationListLoading = useSelector(selectInstallationsLoading)
  const { data: appsListData, isLoading: appsListLoading } = useSelector(selectAppsListState)

  const filteredList: InstallationModelWithAppName[] = useMemo(
    handleMemoisedData(installationsListData, appsListData, pageNumber),
    [installationsListData, appsListData, pageNumber],
  )

  return installationListLoading || appsListLoading ? (
    <>
      <H5>Installation Details</H5>
      <Loader label="Loading" />
    </>
  ) : (
    <>
      <>
        <H5>Installation Details</H5>
        <FadeIn>
          <Table bordered scrollable columns={installationTableColumns} data={filteredList} loading={false} />
        </FadeIn>
      </>
      <Pagination
        pageNumber={pageNumber}
        onChange={handleSetPageNumber(setPageNumber)}
        pageSize={INSTALLATIONS_PER_PAGE}
        totalCount={installationsListData?.totalCount ?? 0}
      />
    </>
  )
}

export default InstallationsTable
