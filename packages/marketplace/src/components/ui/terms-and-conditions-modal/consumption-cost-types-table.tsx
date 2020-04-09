import React from 'react'
import { Table } from '@reapit/elements'

const consumptionCostTypes = [
  { type: 'Annual Registration Fee', amount: '£995', payable: 'Per Contract year, payable in advance' },
  {
    type: 'Monthly App Marketplace Fee',
    amount: '£49.50 ',
    payable:
      /* eslint-disable-next-line max-len */
      'Payable for each Application approved in accordance with clauses 2.6 and 2.6.2, and payable per calendar month (orpart thereof) in arrears .',
  },
  { type: 'Monthly Data Storage Fee - Per 1GB', amount: '£0.50', payable: 'Payable monthly in arrears' },
  {
    type: 'Total Consumption Cost ',
    amount: 'Calculated in accordance with the table below.',
    payable: 'Payable monthly in arrears',
  },
]

const consumptionCostTableColumns = [
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Payable',
    accessor: 'payable',
  },
]

export const ConsumptionCostTypesTable = () => (
  <div>
    <Table
      striped={false}
      bordered={true}
      loading={false}
      data={consumptionCostTypes}
      columns={consumptionCostTableColumns}
    />
  </div>
)
