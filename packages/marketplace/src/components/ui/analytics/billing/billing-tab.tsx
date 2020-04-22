import * as React from 'react'
import CostCalculator from './cost-calculator'

export type BillingTabProps = {}

export const BillingTab: React.FC<BillingTabProps> = () => {
  return (
    <div>
      <CostCalculator />
    </div>
  )
}

export default BillingTab
