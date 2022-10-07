import React, { FC, SetStateAction, useState } from 'react'
import { Dispatch } from 'react'
import { SharesModel } from '../../types/shares'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Button, ButtonGroup, elMb11, Table } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'

export interface SharesTableProps {
  shares: SharesModel[]
  refreshShares: () => void
}

export interface TableCellProps {
  value: string
}

export const handleCopyCode = (setCopyMessage: Dispatch<SetStateAction<string>>) => () => {
  setCopyMessage('Copied')
}

export const handleMouseLeave = (setTooltipMessage: Dispatch<SetStateAction<string>>, message: string) => () => {
  setTooltipMessage(message)
}

export const handleDeleteShare =
  (deleteShare: SendFunction<void, boolean>, refreshShares: () => void, shareId: string) => async () => {
    const shareDeleted = await deleteShare(undefined, { uriParams: { shareId } })

    if (shareDeleted) {
      refreshShares()
    }
  }

export const handleRefreshShare =
  (refreshShare: SendFunction<void, boolean>, refreshShares: () => void, shareId: string) => async () => {
    const shareRefresh = await refreshShare(undefined, { uriParams: { shareId } })

    if (shareRefresh) {
      refreshShares()
    }
  }

export const DSNComponent: FC<TableCellProps> = ({ value }) => {
  const [copyMessage, setCopyMessage] = useState('Copy DSN')

  return (
    <CopyToClipboard text={value} onCopy={handleCopyCode(setCopyMessage)}>
      <Button onMouseLeave={handleMouseLeave(setCopyMessage, 'Copy DSN')} intent="low">
        {copyMessage}
      </Button>
    </CopyToClipboard>
  )
}

export const URLComponent: FC<TableCellProps> = ({ value }) => {
  const [copyMessage, setCopyMessage] = useState('Copy URL')

  return (
    <CopyToClipboard text={value} onCopy={handleCopyCode(setCopyMessage)}>
      <Button onMouseLeave={handleMouseLeave(setCopyMessage, 'Copy URL')} intent="low">
        {copyMessage}
      </Button>
    </CopyToClipboard>
  )
}

export const SharesTable: FC<SharesTableProps> = ({ shares, refreshShares }) => {
  const [refreshingShare, , refreshShare] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.refreshDwShare],
    method: 'POST',
  })

  const [deletingShare, , deleteShare] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.refreshDwShare],
    method: 'DELETE',
  })

  const isLoading = refreshingShare || deletingShare

  return (
    <Table
      className={elMb11}
      rows={shares?.map(({ datasetName, database, schema, warehouse, region, url, dsn, id }) => ({
        cells: [
          {
            label: 'Data Set Name',
            value: datasetName,
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Database',
            value: database,
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Schema',
            value: schema,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Warehouse',
            value: warehouse,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Region',
            value: region,
            narrowTable: {
              showLabel: true,
            },
          },
        ],
        expandableContent: {
          content: (
            <ButtonGroup alignment="center">
              <URLComponent value={url} />
              <DSNComponent value={dsn} />
              <Button
                intent="danger"
                onClick={handleDeleteShare(deleteShare, refreshShares, id)}
                disabled={isLoading}
                loading={isLoading}
              >
                Delete Share
              </Button>
              <Button
                intent="primary"
                onClick={handleRefreshShare(refreshShare, refreshShares, id)}
                disabled={isLoading}
                loading={isLoading}
              >
                Refresh Share
              </Button>
            </ButtonGroup>
          ),
        },
      }))}
    />
  )
}
