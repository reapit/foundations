import { Button, ButtonGroup, elMb11, Table } from '@reapit/elements'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import React, { FC } from 'react'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { DataSetModel } from '../../types/data-sets'
import { CreateRequestModel } from '../../types/requests'

export interface DataSetsTableProps {
  dataSets: DataSetModel[]
  refreshShares: () => void
}

export const handleCreateRequest =
  (
    createShare: SendFunction<CreateRequestModel, boolean>,
    refreshShares: () => void,
    connnectSession: ReapitConnectSession | null,
    datasetId: string,
  ) =>
  async () => {
    const orgId = connnectSession?.loginIdentity.orgId ?? ''
    const email = connnectSession?.loginIdentity.email ?? ''
    const name = connnectSession?.loginIdentity.name ?? ''
    const agencyCloudId = connnectSession?.loginIdentity.agencyCloudId ?? 'SBOX'

    const request: CreateRequestModel = {
      organisationId: orgId,
      requesterEmail: email,
      requesterName: name,
      requestMessage: 'Please can I access this data',
      datasetId,
      customerId: agencyCloudId,
      devMode: false,
    }
    const shareCreated = await createShare(request)

    if (shareCreated) {
      refreshShares()
    }
  }

export const DataSetsTable: FC<DataSetsTableProps> = ({ dataSets, refreshShares }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [creatingShare, , createShare] = useReapitUpdate<CreateRequestModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createDwRequest],
    method: 'POST',
  })

  return (
    <Table
      className={elMb11}
      rows={dataSets?.map(({ name, provider, summary, id }) => ({
        cells: [
          {
            label: 'Name',
            value: name,
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Provider',
            value: provider,
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Description',
            value: summary,
            narrowTable: {
              showLabel: true,
            },
          },
        ],
        expandableContent: {
          content: (
            <ButtonGroup alignment="center">
              <Button
                intent="primary"
                onClick={handleCreateRequest(createShare, refreshShares, connectSession, id)}
                disabled={creatingShare}
                loading={creatingShare}
              >
                Create Share
              </Button>
            </ButtonGroup>
          ),
        },
      }))}
    />
  )
}

export default DataSetsTable
