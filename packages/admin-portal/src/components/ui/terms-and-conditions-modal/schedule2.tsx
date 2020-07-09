import React from 'react'
import { H4 } from '@reapit/elements'
import { ConsumptionCostMethodologyTable } from './consumption-cost-methodology-table'
import { ConsumptionCostExampleTable } from './consumption-cost-example-table'
import { ConsumptionCostTypesTable } from './consumption-cost-types-table'
import styles from '@/styles/blocks/term-and-conditions-modal.scss?mod'

interface ConsumptionCost {
  type: string
  amount: string
  payable: string
}

export const Schedule2 = () => (
  <div>
    <H4 className={`${styles['title']} ${styles['warn']}`}>
      There are no fees or consumption costs during the Beta period
    </H4>
    <H4 className={styles['title']}>SCHEDULE 2 – FEES </H4>
    <ConsumptionCostTypesTable />
    <ConsumptionCostMethodologyTable />
    <ConsumptionCostExampleTable />
  </div>
)
