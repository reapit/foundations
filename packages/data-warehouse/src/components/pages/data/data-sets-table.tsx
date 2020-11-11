import React, { SetStateAction, useContext, useState } from 'react'
import { Button, Table } from '@reapit/elements'
import { MessageContext, MessageState } from '../../../context/message-context'
import { Dispatch } from 'react'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'
import { createRequestService } from '../../../services/requests'
import { getSharesService } from '../../../services/shares'
import { SharesModel } from '../../../types/shares'

export interface DataSetsTableProps {
  dataSets: DataSetModel[]
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const createRequest = (
  setMessageState: Dispatch<React.SetStateAction<MessageState>>,
  setCreatingShare: Dispatch<React.SetStateAction<string>>,
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  value: string,
) => async () => {
  setCreatingShare(value)

  const createdShare = await createRequestService(value)

  setCreatingShare('')

  if (!createdShare) {
    return setMessageState({
      message: 'Something went wrong creating share, please try again',
      variant: 'danger',
      visible: true,
    })
  }

  setMessageState({
    message: 'Successfully created a share',
    variant: 'info',
    visible: true,
  })

  const shares = await getSharesService()
  if (shares) {
    return setShares(shares)
  }
  return setMessageState({
    message: 'Something went wrong fetching shares, please try refreshing',
    variant: 'danger',
    visible: true,
  })
}

export const DataSetsTable: React.FC<DataSetsTableProps> = ({ dataSets, setShares }) => {
  const [creatingShare, setCreatingShare] = useState('')
  const RequestDataSetModel: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setMessageState } = useContext(MessageContext)
    const isLoading = Boolean(creatingShare && creatingShare === value)

    return (
      <Button
        onClick={createRequest(setMessageState, setCreatingShare, setShares, value)}
        disabled={isLoading}
        loading={isLoading}
      >
        Create Share
      </Button>
    )
  }

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Provider',
      accessor: 'provider',
    },
    {
      Header: 'Summary',
      accessor: 'summary',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Create Data Share',
      accessor: 'id',
      Cell: RequestDataSetModel,
    },
  ]

  return <Table columns={columns} data={dataSets} scrollable />
}

export default DataSetsTable
