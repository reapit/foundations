import * as React from 'react'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'
import { Table, Loader } from '@reapit/elements'
import { useSelector } from 'react-redux'
import { selectMonthlyBilling, selectMonthlyBillingLoading } from '@/selector/developer'
import { EndpointBilling, MonthlyBilling } from '@/reducers/developer'

export type CostExplorerTableProps = {}

export type TableRow = {
  resource: string
  endpoints: number
  apiCalls: number
  cost: number
  subRows?: TableRow[]
}

export const prepareTableData = data => {
  if (!data) {
    return []
  }
  const preparedData = data.map(({ requestsByEndpoint, ...row }) => {
    const subRows = requestsByEndpoint.map((request: EndpointBilling) => {
      return {
        serviceName: request.endpoint,
        requestCount: request.requestCount,
        cost: request.cost,
      }
    })
    return { ...row, subRows }
  })
  return preparedData
}

export const prepareTableColumns = (monthlyBilling?: MonthlyBilling | null) => {
  const totalCost = monthlyBilling?.totalCost || 0
  return [
    {
      Header: 'Services',
      accessor: 'serviceName',
      columnProps: {
        className: 'capitalize',
        width: 200,
      },
      Footer: 'Total',
    },
    {
      Header: 'Endpoints',
      accessor: row => {
        return row.endpointCount && formatNumber(row.endpointCount)
      },
    },
    {
      Header: 'Amount',
      accessor: row => {
        return row.requestCount && formatNumber(row.requestCount)
      },
    },
    {
      Header: 'Cost',
      accessor: row => {
        return row.cost && formatCurrency(row.cost)
      },
      Footer: formatCurrency(totalCost),
    },
  ]
}

const CostExplorerTable: React.FC<CostExplorerTableProps> = () => {
  const monthlyBilling = useSelector(selectMonthlyBilling)
  const isLoading = useSelector(selectMonthlyBillingLoading)

  if (isLoading) return <Loader />

  const columns = prepareTableColumns(monthlyBilling)
  const tableData = prepareTableData(monthlyBilling?.requestsByService)

  return (
    <>
      <Table bordered scrollable expandable columns={columns} data={tableData} />
      <p className="mt-5">
        *All charges are subject to VAT. Your totals for each month will be sent to our Accounts Department and you will
        be automatically invoiced at the end of each billing period.
      </p>
      <p className="mt-5">
        ** As our charges are calculated in fractions of pence per transaction, very occasionally you may see a rounding
        discrepancy of more than £0.01 in the Cost Explorer.
      </p>
    </>
  )
}

export default CostExplorerTable
