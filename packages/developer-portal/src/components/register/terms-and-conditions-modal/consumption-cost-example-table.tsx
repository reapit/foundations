import React from 'react'
import { Table, Grid, GridItem, H6 } from '@reapit/elements-legacy'
// eslint-disable-next-line max-len
import { endpointsUsedRange, useFoundationCostTable } from '@/components/analytics/calculator/use-foundation-cost-table'
import { formatNumber } from '@/utils/number-formatter'
import { CostCalculatorFormValues } from '../../analytics/calculator'

const totalCostFormValues: CostCalculatorFormValues = {
  apiCalls: '100000',
  endpointsUsed: 'tier4',
}
const { apiCalls, endpointsUsed } = totalCostFormValues

export const ConsumptionCostExampleTable: React.FC = () => {
  const { tableColumns, tableData } = useFoundationCostTable(endpointsUsed, apiCalls)
  return (
    <div className="mt-10">
      <div className="mb-3">
        <H6>Calculation of Total Consumption Cost - Example for representative purposes only: </H6>
      </div>
      <Grid className="is-vcentered is-mobile">
        <GridItem className="is-one-quarter-tablet is-half-mobile">
          <H6>Endpoints Used</H6>
        </GridItem>
        <GridItem>{endpointsUsedRange[endpointsUsed]}</GridItem>
      </Grid>
      <Grid className="is-vcentered is-mobile">
        <GridItem className="is-one-quarter-tablet is-half-mobile">
          <H6>Monthly API Calls</H6>
        </GridItem>
        <GridItem className="is-half-mobile">{formatNumber(parseFloat(apiCalls))}</GridItem>
      </Grid>
      <Table bordered scrollable columns={tableColumns} data={tableData} />
    </div>
  )
}
