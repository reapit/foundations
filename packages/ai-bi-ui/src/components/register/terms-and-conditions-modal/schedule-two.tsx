import React from 'react'
import { ConsumptionCostMethodologyTable } from './consumption-cost-methodology-table'
import { ConsumptionCostExampleTable } from './consumption-cost-example-table'
import { ConsumptionCostTypesTable } from './consumption-cost-types-table'
import { Subtitle } from '@reapit/elements'

export const ScheduleTwo = () => (
  <>
    <Subtitle>Schedule 2 - Fees</Subtitle>
    <ConsumptionCostTypesTable />
    <ConsumptionCostMethodologyTable />
    <ConsumptionCostExampleTable />
  </>
)
