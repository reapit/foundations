import * as React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { InstallationModel, PagedResultInstallationModel_ } from '@reapit/foundations-ts-definitions'
import { Button, Table, ModalHeader, ModalBody, Pagination, Alert, Loader } from '@reapit/elements'
import { InstallationParams, appInstallationsRequestData } from '@/actions/app-installations'
import { ReduxState } from '@/types/core'

export interface InstallationsInnerProps {
  appId: string
  onUninstall: (app: InstallationModel) => () => void
  afterClose?: () => void
}

export interface InstallationsMappedProps {
  installationsData: PagedResultInstallationModel_ | null
  loading: boolean
}
export interface InstallationsMappedActions {
  fetchInstallationsApp: (params: InstallationParams) => () => void
}

export const mapStateToProps = (state: ReduxState): InstallationsMappedProps => ({
  installationsData: state.installations.installationsAppData,
  loading: state.installations.loading
})

export const mapDispatchToProps = (dispatch: any): InstallationsMappedActions => ({
  fetchInstallationsApp: (params: InstallationParams) => () => {
    dispatch(appInstallationsRequestData(params))
  }
})

export type InstallationsProps = InstallationsInnerProps & InstallationsMappedProps & InstallationsMappedActions

const generateColumns = (onUninstall: (app: InstallationModel) => () => void) => () => {
  return [
    {
      Header: 'Client',
      accessor: 'client'
    },
    {
      Header: 'Date Installed',
      accessor: d => dayjs(d.created).format('DD/MM/YYYY')
    },
    {
      Header: 'Uninstall',
      Cell: ({ row }) => {
        return (
          <Button type="button" variant="primary" onClick={onUninstall(row.original)}>
            Uninstall
          </Button>
        )
      }
    }
  ]
}

export const Installations: React.FC<InstallationsProps> = ({
  appId,
  loading,
  installationsData,
  onUninstall,
  afterClose,
  fetchInstallationsApp
}) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1)
  const { data = [], pageSize, totalCount } = installationsData || {}
  const columns = React.useMemo(generateColumns(onUninstall), [installationsData])

  React.useEffect(fetchInstallationsApp({ appId: [appId], isInstalled: true, pageNumber, pageSize }), [appId])

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

export default connect(mapStateToProps, mapDispatchToProps)(Installations)
