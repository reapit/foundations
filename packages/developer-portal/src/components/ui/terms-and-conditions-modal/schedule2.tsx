import React from 'react'
import { H4 } from '@reapit/elements'
import { ConsumptionCostMethodologyTable } from './consumption-cost-methodology-table'
import { ConsumptionCostExampleTable } from './consumption-cost-example-table'
import { ConsumptionCostTypesTable } from './consumption-cost-types-table'
import { warn } from './__styles__/termsAndConditionsModal'
import { cx } from 'linaria'

export const Schedule2 = () => (
  <div>
    <H4 className={cx(warn, 'text-center')}>There are no fees or consumption costs during the Beta period</H4>
    <H4 className="text-center">SCHEDULE 2 – FEES </H4>
    <ConsumptionCostTypesTable />
    <ConsumptionCostMethodologyTable />
    <ConsumptionCostExampleTable />
  </div>
)
