import * as React from 'react'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'
import { Table } from '@reapit/elements'

export type CostExplorerTableProps = {}

export type TableRow = {
  resource: string
  endpoints: number
  apiCalls: number
  cost: number
  subRows?: TableRow[]
}

// We'll need to use this fake data until APIs are ready
export const tableData: TableRow[] = [
  {
    resource: 'contacts',
    endpoints: 3,
    apiCalls: 1440,
    cost: 784,
    subRows: [
      {
        resource: '/contacts',
        endpoints: 1,
        apiCalls: 440,
        cost: 84,
      },
      {
        resource: '/contacts/{ID}',
        endpoints: 1,
        apiCalls: 1200,
        cost: 500,
      },
      {
        resource: '/contacts/{ID}',
        endpoints: 1,
        apiCalls: 800,
        cost: 200,
      },
    ],
  },
  {
    resource: 'properties',
    endpoints: 9,
    apiCalls: 4000,
    cost: 567,
    subRows: [
      {
        resource: '/properties',
        endpoints: 3,
        apiCalls: 1000,
        cost: 400,
      },
      {
        resource: '/properties/{ID}',
        endpoints: 3,
        apiCalls: 1000,
        cost: 100,
      },
      {
        resource: '/properties/{ID}',
        endpoints: 3,
        apiCalls: 2000,
        cost: 67,
      },
    ],
  },
  {
    resource: 'developers',
    endpoints: 5,
    apiCalls: 6000,
    cost: 594,
    subRows: [
      {
        resource: '/developers',
        endpoints: 1,
        apiCalls: 2000,
        cost: 200,
      },
      {
        resource: '/developers/{ID}',
        endpoints: 3,
        apiCalls: 3000,
        cost: 200,
      },
      {
        resource: '/developers/{ID}',
        endpoints: 2,
        apiCalls: 1000,
        cost: 194,
      },
    ],
  },
  {
    resource: 'customers',
    endpoints: 10,
    apiCalls: 1500,
    cost: 200,
    subRows: [
      {
        resource: '/customers',
        endpoints: 5,
        apiCalls: 500,
        cost: 50,
      },
      {
        resource: '/customers/{ID}',
        endpoints: 1,
        apiCalls: 1000,
        cost: 50,
      },
      {
        resource: '/customers/{ID}',
        endpoints: 4,
        apiCalls: 500,
        cost: 100,
      },
    ],
  },
]

export const tableColumns = [
  {
    Header: 'Resource',
    accessor: 'resource',
    columnProps: {
      className: 'capitalize',
      width: 200,
    },
    Footer: 'Total',
  },
  {
    Header: 'Endpoints',
    accessor: row => {
      return formatNumber(row.endpoints)
    },
    Footer: info => {
      const totalEndpoints = info.rows.reduce((sum, row) => row.original.endpoints + sum, 0)
      return formatNumber(totalEndpoints)
    },
  },
  {
    Header: 'API Calls',
    accessor: row => {
      return formatNumber(row.apiCalls)
    },
    Footer: info => {
      const totalApiCalls = info.rows.reduce((sum, row) => row.original.apiCalls + sum, 0)
      return formatNumber(totalApiCalls)
    },
  },
  {
    Header: 'Cost',
    accessor: row => {
      return formatCurrency(row.cost)
    },
    Footer: info => {
      const totalCost = info.rows.reduce((sum, row) => row.original.cost + sum, 0)
      return formatCurrency(totalCost)
    },
  },
]

const CostExplorerTable: React.FC<CostExplorerTableProps> = () => {
  return (
    <>
      <Table bordered scrollable expandable columns={tableColumns} data={tableData} />
      <p className="mt-5">
        *All charges are subject to VAT. Your totals for each month will be sent to our Accounts Department and you will
        be automatically invoiced at the end of each billing period.
      </p>
    </>
  )
}

export default CostExplorerTable
