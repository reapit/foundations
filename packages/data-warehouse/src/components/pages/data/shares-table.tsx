import React, { SetStateAction, useContext, useState } from 'react'
import { Button, Table } from '@reapit/elements'
import { MessageContext, MessageState } from '../../../context/message-context'
import { Dispatch } from 'react'
import { PagedApiResponse } from '../../../types/core'
import { deleteSharesService, getSharesService } from '../../../services/shares'
import { SharesModel } from '../../../types/shares'
import { FaCopy } from 'react-icons/fa'
import CopyToClipboard from 'react-copy-to-clipboard'
import { btnCopy, tooltiptext } from './__styles__/tooltip'

export interface SharesTableProps {
  shares: SharesModel[]
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const deleteShare = (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  value: string,
) => async () => {
  const disabled = await deleteSharesService(value)

  if (!disabled) {
    return setMessageState({
      message: 'Something went wrong deleting this data share',
      variant: 'danger',
      visible: true,
    })
  }

  setMessageState({
    message: 'Successfully deleted share',
    variant: 'info',
    visible: true,
  })

  const shares = await getSharesService()
  if (shares) {
    return setShares(shares)
  }
  return setMessageState({ message: 'Something went wrong fetching shares', variant: 'danger', visible: true })
}

export const handleMouseLeave = (setTooltipMessage: React.Dispatch<React.SetStateAction<string>>, message: string) => {
  return () => {
    setTooltipMessage(message)
  }
}

export const handleCopyCode = (setTooltipMessage: React.Dispatch<React.SetStateAction<string>>) => {
  return () => {
    setTooltipMessage('Copied')
  }
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
  const DeleteShareComponent: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setMessageState } = useContext(MessageContext)

    return (
      <Button variant="danger" onClick={deleteShare(setMessageState, setShares, value)}>
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
      Header: 'Account Name',
      accessor: 'accountName',
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
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Create Data Share',
      accessor: 'id',
      Cell: DeleteShareComponent,
    },
  ]

  return <Table columns={columns} data={shares} scrollable />
}

export default SharesTable
