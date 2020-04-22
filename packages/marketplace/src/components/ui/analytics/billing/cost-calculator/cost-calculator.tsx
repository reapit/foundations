import * as React from 'react'
import { H4 } from '@reapit/elements'

type CostCalculatorProps = {}

const CostCalculator: React.FC<CostCalculatorProps> = () => {
  return (
    <div>
      <H4>Cost Calculator</H4>
      <p className="is-italic">
        You can calculate the estimated monthly cost below using our Cost Calculator. Just select the number of
        endpoints and enter the amount of API calls below. To see the full Foundations Pricing, please click{' '}
        <a
          href="https://www.dropbox.com/s/tstsu2vzskf83by/Foundation%20Pricing_4.pdf?dl=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>
    </div>
  )
}

export default CostCalculator
