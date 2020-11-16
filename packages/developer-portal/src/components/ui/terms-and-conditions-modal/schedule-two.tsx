import React from 'react'
import { H5, Content, Section } from '@reapit/elements'
import { ConsumptionCostMethodologyTable } from './consumption-cost-methodology-table'
import { ConsumptionCostExampleTable } from './consumption-cost-example-table'
import { ConsumptionCostTypesTable } from './consumption-cost-types-table'
import { Warn } from './__styles__/terms-and-conditions'

export const ScheduleTwo = () => (
  <Content>
    <Warn>There are no fees or consumption costs during the Beta period</Warn>
    <H5 className="text-center">Schedule 2 - Fees</H5>
    <Section>
      <ConsumptionCostTypesTable />
    </Section>
    <Section>
      <ConsumptionCostMethodologyTable />
    </Section>
    <Section>
      <ConsumptionCostExampleTable />
    </Section>
  </Content>
)
