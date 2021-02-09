import React, { SetStateAction, useContext, useState } from 'react'
import { Button, Table } from '@reapit/elements'
import { MessageContext } from '../../../context/message-context'
import { Dispatch } from 'react'
import { PagedApiResponse } from '../../../types/core'
import { SharesModel } from '../../../types/shares'
import { FaCopy } from 'react-icons/fa'
import CopyToClipboard from 'react-copy-to-clipboard'
import { btnCopy, tooltiptext } from './__styles__/tooltip'
import { deleteShare, handleCopyCode, handleMouseLeave } from './data-handlers'

export interface SharesTableProps {
  shares: SharesModel[]
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const DSNComponent: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
  const [tooltipMessage, setTooltipMessage] = useState('Copy DSN')

  return (
    <CopyToClipboard text={value} onCopy={handleCopyCode(setTooltipMessage)}>
      <div onMouseLeave={handleMouseLeave(setTooltipMessage, 'Copy DSN')} role="button" className={btnCopy}>
        <FaCopy size={24} />
        <span className={tooltiptext}>{tooltipMessage}</span>
      </div>
    </CopyToClipboard>
  )
}

export const URLComponent: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
  const [tooltipMessage, setTooltipMessage] = useState('Copy URL')

  return (
    <CopyToClipboard text={value} onCopy={handleCopyCode(setTooltipMessage)}>
      <div onMouseLeave={handleMouseLeave(setTooltipMessage, 'Copy URL')} role="button" className={btnCopy}>
        <FaCopy size={24} />
        <span className={tooltiptext}>{tooltipMessage}</span>
      </div>
    </CopyToClipboard>
  )
}

export const SharesTable: React.FC<SharesTableProps> = ({ shares, setShares }) => {
  const [deletingShare, setDeletingShare] = useState('')

  const DeleteShareComponent: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setMessageState } = useContext(MessageContext)
    const isLoading = Boolean(deletingShare && deletingShare === value)

    return (
      <Button
        variant="danger"
        onClick={deleteShare(setMessageState, setDeletingShare, setShares, value)}
        disabled={isLoading}
        loading={isLoading}
      >
        Delete Share
      </Button>
    )
  }

  const columns = [
    {
      Header: 'Data Set Name',
      accessor: 'datasetName',
    },
    {
      Header: 'Database',
      accessor: 'database',
    },
    {
      Header: 'Schema',
      accessor: 'schema',
    },
    {
      Header: 'Warehouse',
      accessor: 'warehouse',
    },
    {
      Header: 'Region',
      accessor: 'region',
    },
    {
      Header: 'Url',
      accessor: 'url',
      Cell: URLComponent,
    },
    {
      Header: 'DSN',
      accessor: 'dsn',
      Cell: DSNComponent,
    },
    {
      Header: 'Delete Data Share',
      accessor: 'id',
      Cell: DeleteShareComponent,
    },
  ]

  return <Table columns={columns} data={shares} scrollable />
}

export default SharesTable
