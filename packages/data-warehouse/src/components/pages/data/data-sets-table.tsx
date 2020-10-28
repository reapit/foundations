import React, { SetStateAction, useContext } from 'react'
import { Button, ErrorData, Table } from '@reapit/elements'
// import { FaCheck, FaTimes } from 'react-icons/fa'
import { ErrorContext } from '../../../context/error-context'
import { Dispatch } from 'react'
import { serverError } from '../../ui/toast-error'
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
  setServerErrorState: Dispatch<React.SetStateAction<ErrorData | null>>,
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>,
  value: string,
) => async () => {
  const disabled = await createRequestService(value)

  if (!disabled) return setServerErrorState(serverError('Something went wrong disabling account, please try again'))

  const shares = await getSharesService()
  if (shares) {
    return setShares(shares)
  }
  return setServerErrorState(serverError('Something went wrong fetching accounts, please try again'))
}

export const DataSetsTable: React.FC<DataSetsTableProps> = ({ dataSets, setShares }) => {
  const RequestDataSetModel: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setServerErrorState } = useContext(ErrorContext)

    return <Button onClick={createRequest(setServerErrorState, setShares, value)}>Create Share</Button>
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

  return <Table columns={columns} data={dataSets} />
}

export default DataSetsTable
