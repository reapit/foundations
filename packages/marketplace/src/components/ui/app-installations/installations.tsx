import * as React from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { InstallationModel, PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import { Button, Table, ModalHeader, ModalBody, Pagination, Alert, Loader } from '@reapit/elements'
import { InstallationParams, appInstallationsRequestData } from '@/actions/app-installations'
import { ReduxState } from '@/types/core'
import { selectInstallationAppData, selectInstallAppLoading } from '@/selector/installations'
import { Dispatch } from 'redux'

// export interface InstallationsInnerProps {
//   appId: string
//   onUninstall: (app: InstallationModel) => () => void
//   afterClose?: () => void
// }

// export interface InstallationsMappedProps {
//   installationsData: PagedResultInstallationModel_ | null
//   loading: boolean
// }
// export interface InstallationsMappedActions {
//   fetchInstallationsApp: (params: InstallationParams) => () => void
// }

// export const mapStateToProps = (state: ReduxState): InstallationsMappedProps => ({
//   installationsData: state.installations.installationsAppData,
//   loading: state.installations.loading,
// })

// export const mapDispatchToProps = (dispatch: any): InstallationsMappedActions => ({
//   fetchInstallationsApp: (params: InstallationParams) => () => {
//     dispatch(appInstallationsRequestData(params))
//   },
// })

export type InstallationsProps = {
  appId: string
  onUninstall: (app: InstallationModel) => () => void
  afterClose?: () => void
}

export type CustomUninstallCell = React.FC<{
  onClick: () => void
}>

export const generateColumns = (
  onUninstall: (app: InstallationModel) => () => void,
  CustomUninstallCell?: CustomUninstallCell,
) => () => {
  const UninstallCell = ({ row }) => {
    if (CustomUninstallCell) {
      return <CustomUninstallCell onClick={onUninstall(row.original)} />
    }

    return (
      <Button type="button" variant="primary" onClick={onUninstall(row.original)}>
        Uninstall
      </Button>
    )
  }

  return [
    {
      Header: 'Client',
      accessor: 'client',
    },
    {
      Header: 'Date Installed',
      accessor: d => dayjs(d.created).format('DD/MM/YYYY'),
    },
    {
      Header: 'Uninstall',
      Cell: UninstallCell,
    },
  ]
}

export const handleFetchInstallationsApp = (
  appId: string,
  pageNumber: number,
  pageSize: number,
  dispatch: Dispatch,
) => {
  return () => {
    const params: InstallationParams = {
      appId: [appId],
      isInstalled: true,
      pageNumber,
      pageSize,
    }
    dispatch(appInstallationsRequestData(params))
  }
}

export const Installations: React.FC<InstallationsProps> = ({ appId, onUninstall, afterClose }) => {
  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = React.useState<number>(1)
  const installationsData = useSelector(selectInstallationAppData)
  const loading = useSelector(selectInstallAppLoading)
  const { data = [], pageSize = 1, totalCount } = installationsData || {}
  const columns = React.useMemo(generateColumns(onUninstall), [installationsData])

  React.useEffect(handleFetchInstallationsApp(appId, pageNumber, pageSize, dispatch), [
    appId,
    pageNumber,
    pageSize,
    dispatch,
  ])

  return (
    <>
      <ModalHeader title="Installations" afterClose={afterClose as () => void} />
      <ModalBody
        body={
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    <Table data={data} columns={columns} loading={false} />
                    <Pagination
                      pageNumber={pageNumber}
                      pageSize={pageSize}
                      totalCount={totalCount}
                      onChange={setPageNumber}
                    />
                  </>
                ) : (
                  <Alert type="info" message="No Installations Found" />
                )}
              </>
            )}
          </>
        }
      />
    </>
  )
}

export default Installations
