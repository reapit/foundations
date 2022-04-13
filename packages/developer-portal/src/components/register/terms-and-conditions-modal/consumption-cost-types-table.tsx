import { elMb11, Table } from '@reapit/elements'
import React from 'react'

const consumptionCostTypes = [
  { type: 'Annual Registration Fee', amount: '£995', payable: 'Per Contract year, payable in advance' },
  {
    type: 'Annual App Marketplace Fee',
    amount: '£595',
    payable:
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

export const ConsumptionCostTypesTable = () => (
  <Table
    className={elMb11}
    rows={consumptionCostTypes.map((item) => ({
      cells: [
        {
          label: 'Type',
          value: item.type,
          cellHasDarkText: true,
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Amount',
          value: item.amount,
          cellHasDarkText: true,
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Payable',
          value: item.payable,
          cellHasDarkText: true,
          narrowTable: {
            showLabel: true,
          },
        },
      ],
    }))}
  />
)
