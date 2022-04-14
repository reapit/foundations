import React, { FC } from 'react'
import { endpointsUsedRange } from '../../analytics/calculator/use-foundation-cost-table'
import { formatNumber } from '../../../utils/number-formatter'
import { CostCalculatorFormValues } from '../../analytics/calculator'
import { BodyText, Grid, ColSplit } from '@reapit/elements'
import { AnalyticsCalculatorTable } from '../../analytics/calculator/results-table'

const totalCostFormValues: CostCalculatorFormValues = {
  apiCalls: '100000',
  endpointsUsed: 'tier4',
}
const { apiCalls, endpointsUsed } = totalCostFormValues

export const ConsumptionCostExampleTable: FC = () => {
  return (
    <>
      <BodyText>Calculation of Total Consumption Cost - Example for representative purposes only: </BodyText>
      <Grid>
        <ColSplit>
          <BodyText>Endpoints Used</BodyText>
        </ColSplit>
        <ColSplit>{endpointsUsedRange[endpointsUsed]}</ColSplit>
      </Grid>
      <Grid>
        <ColSplit>
          <BodyText>Monthly API Calls</BodyText>
        </ColSplit>
        <ColSplit className="is-half-mobile">{formatNumber(parseFloat(apiCalls))}</ColSplit>
      </Grid>
      <AnalyticsCalculatorTable apiCalls={apiCalls} endpointsUsed={endpointsUsed} />
    </>
  )
}
