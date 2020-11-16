import React from 'react'
import { Table } from '@reapit/elements'

const consumptionCostTypes = [
  { type: 'Annual Registration Fee', amount: '£995', payable: 'Per Contract year, payable in advance' },
  {
    type: 'Annual App Marketplace Fee',
    amount: '£595',
    payable:
      /* eslint-disable-next-line max-len */
      'Payable for each Application approved in accordance with clauses 2.5 and 2.5.3, and payable per contract year, in advance',
  },
  {
    type: 'Monthly Developer Edition Fee',
    amount: '£300 ',
    payable: 'Payable monthly on an ongoing basis until cancelled.',
  },
  {
    type: 'Total Consumption Cost ',
    amount: 'Calculated in accordance with the table below.',
    payable: 'Payable monthly in arrears',
  },
  {
    type: 'Warehouse',
  },
  {
    type: 'Reapit Connect',
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
