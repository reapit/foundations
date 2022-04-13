import React, { FC } from 'react'
import { BodyText, elMb11, Table } from '@reapit/elements'
import { useFoundationCostTable } from './use-foundation-cost-table'
import { formatCurrency } from '../../../utils/number-formatter'

export interface AnalyticsCalculatorTableProps {
  endpointsUsed: string
  apiCalls: string
}

export const AnalyticsCalculatorTable: FC<AnalyticsCalculatorTableProps> = ({ endpointsUsed, apiCalls }) => {
  const { tableData, totalMonthlyCost } = useFoundationCostTable(endpointsUsed, apiCalls)

  return (
    <>
      <Table
        className={elMb11}
        rows={tableData.map(({ numberOfApiCalls, costPerApiCall, totalCost }) => ({
          cells: [
            {
              label: 'Number of API Calls',
              value: numberOfApiCalls,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Cost Per API Call',
              value: costPerApiCall,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Cost',
              icon: 'paymentSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
              value: formatCurrency(totalCost),
            },
          ],
        }))}
      />
      <BodyText hasGreyText>Estimated total monthly cost: {formatCurrency(totalMonthlyCost)}</BodyText>
    </>
  )
}
