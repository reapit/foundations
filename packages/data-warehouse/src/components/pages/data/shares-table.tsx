import React, { SetStateAction, useContext, useState } from 'react'
import { Button, ErrorData, Table } from '@reapit/elements'
import { ErrorContext } from '../../../context/error-context'
import { Dispatch } from 'react'
import { serverError } from '../../ui/toast-error'
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
  setServerErrorState: Dispatch<React.SetStateAction<ErrorData | null>>,
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  value: string,
) => async () => {
  const disabled = await deleteSharesService(value)

  if (!disabled) return setServerErrorState(serverError('Something went wrong deleting this data share'))

  const shares = await getSharesService()
  if (shares) {
    return setShares(shares)
  }
  return setServerErrorState(serverError('Something went wrong fetching shares'))
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
    const { setServerErrorState } = useContext(ErrorContext)

    return <Button onClick={deleteShare(setServerErrorState, setShares, value)}>Delete Share</Button>
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
