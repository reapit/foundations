import * as React from 'react'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'
import { Table, Loader } from '@reapit/elements'
import { useSelector } from 'react-redux'
import { selectMonthlyBilling, selectMonthlyBillingLoading } from '@/selector/developer'
import { EndpointBilling } from '@/reducers/developer'

export type CostExplorerTableProps = {}

export type TableRow = {
  resource: string
  endpoints: number
  apiCalls: number
  cost: number
  subRows?: TableRow[]
}

export const prepareTableData = data => {
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

interface PrepareTableColumns {
  totalCost: number
  totalEndpoints: number
  totalRequests: number
}

export const prepareTableColumns = ({ totalCost, totalEndpoints, totalRequests }: PrepareTableColumns) => [
  {
    Header: 'Resource',
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
    Footer: formatNumber(totalEndpoints),
  },
  {
    Header: 'API Calls',
    accessor: row => {
      return row.requestCount && formatNumber(row.requestCount)
    },
    Footer: formatNumber(totalRequests),
  },
  {
    Header: 'Cost',
    accessor: row => {
      return row.cost && formatCurrency(row.cost)
    },
    Footer: formatCurrency(totalCost),
  },
]

const CostExplorerTable: React.FC<CostExplorerTableProps> = () => {
  const monthlyBilling = useSelector(selectMonthlyBilling)
  const isLoading = useSelector(selectMonthlyBillingLoading)

  if (isLoading || !monthlyBilling) return <Loader />

  const { totalCost, totalEndpoints, totalRequests } = monthlyBilling
  const columns = prepareTableColumns({ totalCost, totalEndpoints, totalRequests })
  const tableData = prepareTableData(monthlyBilling.requestsByService)

  return (
    <>
      <Table bordered scrollable expandable columns={columns} data={tableData} />
      <p className="mt-5">
        *All charges are subject to VAT. Your totals for each month will be sent to our Accounts Department and you will
        be automatically invoiced at the end of each billing period.
      </p>
    </>
  )
}

export default CostExplorerTable
